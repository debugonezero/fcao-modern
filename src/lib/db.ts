import Database from 'better-sqlite3';
import path from 'path';

// Database file path
const DB_PATH = path.join(process.cwd(), 'orders.db');

// Initialize database
const db = new Database(DB_PATH);

// Create orders and items tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    stripe_session_id TEXT UNIQUE,
    customer_email TEXT,
    customer_name TEXT,
    shipping_address_line1 TEXT,
    shipping_address_line2 TEXT,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_postal_code TEXT,
    shipping_country TEXT,
    shipping_method TEXT,
    shipping_cost INTEGER,
    total_amount INTEGER,
    currency TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    shipped_at DATETIME,
    tracking_number TEXT
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT,
    product_id TEXT,
    product_name TEXT,
    quantity INTEGER,
    unit_price INTEGER,
    stripe_price_id TEXT,
    FOREIGN KEY (order_id) REFERENCES orders (id)
  );
`);

export interface Order {
  id: string;
  stripe_session_id: string;
  customer_email: string;
  customer_name: string;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  shipping_method?: string;
  shipping_cost?: number;
  total_amount: number;
  currency: string;
  items: OrderItem[];
  status: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  stripe_price_id: string;
}

export const saveOrder = (order: Order) => {
  const insertOrder = db.prepare(`
    INSERT INTO orders (
      id, stripe_session_id, customer_email, customer_name,
      shipping_address_line1, shipping_address_line2, shipping_city,
      shipping_state, shipping_postal_code, shipping_country,
      shipping_method, shipping_cost, total_amount, currency, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertItem = db.prepare(`
    INSERT INTO order_items (
      order_id, product_id, product_name, quantity, unit_price, stripe_price_id
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction((orderData: Order) => {
    insertOrder.run(
      orderData.id,
      orderData.stripe_session_id,
      orderData.customer_email,
      orderData.customer_name,
      orderData.shipping_address.line1,
      orderData.shipping_address.line2 || null,
      orderData.shipping_address.city,
      orderData.shipping_address.state,
      orderData.shipping_address.postal_code,
      orderData.shipping_address.country,
      orderData.shipping_method || null,
      orderData.shipping_cost || 0,
      orderData.total_amount,
      orderData.currency,
      orderData.status
    );

    for (const item of orderData.items) {
      insertItem.run(
        orderData.id,
        item.product_id,
        item.product_name,
        item.quantity,
        item.unit_price,
        item.stripe_price_id
      );
    }
  });

  transaction(order);
};

export const getOrders = (startDate?: string, endDate?: string) => {
  let query = "SELECT * FROM orders WHERE status != 'shipped'";
  const params: (string | number)[] = [];

  if (startDate && endDate) {
    query += " AND created_at BETWEEN ? AND ?";
    params.push(startDate, endDate);
  }

  const orders = db.prepare(query).all(...params) as (Order & { id: string })[];

  return orders.map(order => {
    const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id) as OrderItem[];
    return {
      ...order,
      items
    };
  });
};

export const updateOrderStatus = (orderId: string, status: string, trackingNumber?: string) => {
  const statement = db.prepare(`
    UPDATE orders 
    SET status = ?, tracking_number = ?, shipped_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `);
  statement.run(status, trackingNumber || null, orderId);
};

export default db;
