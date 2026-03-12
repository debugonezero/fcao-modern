"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto px-6 text-center mb-16"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 text-center">
          <span className="text-brand-gold relative inline-block">Projects<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
        </h1>
      </motion.div>
 
      {/* PROJECT 1: BOOK */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="glass-card flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <div className="relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/Faithful-Saints-of-Christ-Book-Cover.png" 
                alt="Faithful Saints of Christ Book Cover" 
                width={400} height={600} 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <button className="bg-gradient-to-r from-brand-gold to-brand-gold-glow text-white px-6 py-2 rounded-full font-bold shadow-xl shadow-brand-gold/20 border border-white/10 hover:shadow-2xl hover:shadow-brand-gold/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-sm tracking-wide">
                  Available in Store
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-4xl font-heading font-extrabold mb-2 text-neutral-900">
              Faithful Saints of Christ Book
            </h2>
            <h3 className="text-xl font-bold text-brand-blue tracking-wide mb-6">
              Perseverance under persecution
            </h3>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              <p>
                The first book that FCAO commissioned to be published is titled <em>Faithful Saints of Christ</em>. The book was commissioned by FCAO to be written by several authors and scholars, and it was recently completed and published in December 2025. FCAO also commissioned a French artist (Mathieu Nozieres) that has produced an oil painting portraying a &ldquo;pre-battle scene&rdquo; from the historical event called the Battle of Avarayr.
              </p>
              <p>
                <em>Faithful Saints of Christ</em> is both a spiritual journey and a powerful historical testimony. It defines the meaning of the &ldquo;faithful saint of Christ&rdquo; and also provides a detailed explanation of the fundamentals of Christian faith. It traces the miracles, struggles, and perseverance that shaped Armenian history. Readers will witness the courage of Armenians who defended their Christian faith against oppression—with emphasis on the story of St. Vartan and the Battle of Avarayr: the conflict in which the Armenians decisively confirmed their identity as a Christian people. The narrative continues into modern history, recounting the Armenian Genocide of 1915 in Turkey, the hidden genocide of 1918 in Iran, and the ongoing persecution of Christians worldwide. Faithful Saints of Christ honors the saints of yesterday who remained steadfast under persecution, while encouraging believers of today to stay faithful to Christ against the obstacles of the present world.
              </p>
              <p>
                This book is intended to be a project which will hopefully lead into the production of a movie script about the Battle of Avarayr which God willing will ultimately lead into the production of the movie itself.
              </p>
              <p>
                All net proceeds from the sale of this book and the sale of the reproduction copies of the original oil painting will go toward the professional writing of the movie script and/or supporting various Christian mission-based organizations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT 2: OIL PAINTING */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="glass-card flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-black/20 group">
              <Image 
                src="/images/Battle-of-Avarayr-1000px.png" 
                alt="Battle of Avarayr Original Oil Painting" 
                width={600} height={400} 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <button className="bg-gradient-to-r from-brand-gold to-brand-gold-glow text-white px-6 py-2 rounded-full font-bold shadow-xl shadow-brand-gold/20 border border-white/10 hover:shadow-2xl hover:shadow-brand-gold/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-sm tracking-wide">
                  Available in Store
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-4xl font-heading font-extrabold mb-2 text-neutral-900">
              Pre-Battle Scene of Avarayr Portrait
            </h2>
            <h3 className="text-xl font-bold text-brand-blue tracking-wide mb-6">
              Reproduction Copy of Original Oil Painting
            </h3>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              <p>
                The Pre-Battle Scene of Avarayr Portrait is a reproduction copy of the original oil painting masterpiece by famous French Artist, Mathieu Nozieres. The oil painting was produced as a complement to the Faithful Saints of Christ book, and a cropped portion of the painting is presented as the cover of the book. The events surrounding the Battle of Avarayr are described in detail in the book. High-quality reproduction copies are available for purchase.
              </p>
            </div>
            <h3 className="text-xl font-bold text-brand-blue tracking-wide mt-6">
              The original oil painting masterpiece, which is 30 inches high and 60 inches wide, has been appraised for $100,000 by a prominent art appraiser.
            </h3>
          </motion.div>
        </div>
      </section>

      {/* PROJECT 3: BOOK SIGNING EVENTS */}
      <section className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading font-extrabold mb-10 text-neutral-900 text-center">
            Book Signing Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card !p-6">
              <h4 className="font-bold text-lg mb-2 text-brand-blue">Armenian Society of Los Angeles</h4>
              <p className="text-sm text-neutral-600 mb-4">Saturday, January 24, 2026<br/>3rd Floor Library Room 102<br/>117 South Louise St., Glendale 91205<br/>From 2:00 – 5:00 PM</p>
              <p className="text-xs text-brand-blue/80 font-medium">Watch the recording: <a href="https://www.youtube.com/watch?v=fNoCEyrlQMM" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-brand-blue">youtube.com/watch?v=fNoCEyrlQMM</a></p>
            </div>
            <div className="glass-card !p-6">
              <h4 className="font-bold text-lg mb-2 text-brand-blue">Ararat/Eskijian Museum & Church</h4>
              <p className="text-sm text-neutral-600 mb-4">Sunday, January 25, 2026<br/>15105 Mission Hills Road, Mission Hills CA 91345<br/>From 4:00 – 6:00 PM</p>
              <p className="text-xs text-brand-blue/80 font-medium">Watch the live-stream recording: <a href="https://www.youtube.com/@AraratEskijianMuseum" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-brand-blue">youtube.com/@AraratEskijianMuseum</a></p>
            </div>
          </div>

          <div className="glass-card flex flex-col gap-8 bg-brand-light/50">
            <div className="w-full">
              <h3 className="text-xl font-bold mb-4 text-neutral-900">Meet the Authors, Get Your Book Signed</h3>
              <p className="text-sm text-neutral-600 mb-6">
                All five authors presented segments from the book. This collaboration brings together scholars, environmentalists, and church leaders to testify to the miracles and struggles that shaped Armenian history.
              </p>
              <ul className="text-sm text-neutral-600 space-y-3">
                <li><strong className="text-neutral-900">Christopher H. Zakian:</strong> Director of Communications for the Eastern Diocese of the Armenian Church of America</li>
                <li><strong className="text-neutral-900">Dr. Michael Papazian:</strong> Professor of Religion and Philosophy at Berry College</li>
                <li><strong className="text-neutral-900">Dr. Rosemary Hartounian Cohen:</strong> Sociologist with a doctorate degree from the Sorbonne, Paris</li>
                <li><strong className="text-neutral-900">Armen Simonian:</strong> Founder of First Christians Alliance Outreach</li>
                <li><strong className="text-neutral-900">Zorik Pirveysian:</strong> Environmental Engineer / Pastor</li>
              </ul>
              <p className="text-sm text-neutral-600 mt-6 pt-6 border-t border-black/10">
                The Pre-Battle Scene of Avarayr’s original oil painting masterpiece will be displayed to the public for the first time at each of these events. The reproduction copies can be purchased at these events or from the FCAO&apos;s website.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
