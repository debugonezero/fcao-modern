"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Globe, Shield, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Globe className="w-6 h-6 text-brand-gold" />,
      title: "Global Outreach",
      description: "Extending the Christian faith across borders through media, literature, and community support."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-brand-gold" />,
      title: "Biblical Truth",
      description: "Remaining steadfast in the infallible Word of God and the testimonies of the early Saints."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-gold" />,
      title: "Perseverance",
      description: "Standing strong with persecuted Christians worldwide, honoring the legacy of those who defended the faith."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: "Community Action",
      description: "Partnering with mission-based organizations to alleviate suffering and spread hope."
    }
  ];

  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-6 text-center mb-16 relative z-10"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-neutral-900 dark:text-white">
          About <span className="text-brand-gold relative inline-block">FCAO<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          First Christians Alliance Outreach is dedicated to preserving the history of early Christianity, supporting persecuted believers today, and fulfilling the Great Commission through media and technology.
        </p>
      </motion.div>

      {/* OUR STORY / FOUNDATION */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="glass-card flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-sm font-bold tracking-widest uppercase text-brand-gold mb-2">Our Foundation</h3>
            <h2 className="text-3xl font-heading font-extrabold mb-6 text-neutral-900 dark:text-white">
              A Legacy of Faith
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              <p>
                Founded by Armen Simonian, First Christians Alliance Outreach (FCAO) was established to shine a light on the incredible perseverance of early Christians—specifically the Armenian people, who were the first nation to adopt Christianity as a state religion in 301 AD.
              </p>
              <p>
                From the legendary Battle of Avarayr led by St. Vartan, where believers chose death over renouncing Christ, to the modern-day persecutions in the Middle East, our organization exists to ensure their stories are never forgotten.
              </p>
              <p>
                Today, FCAO operates as a registered non-profit producing literature, commissioning historical artwork, and laying the groundwork for major motion pictures that will bring these powerful testimonies of faith to a global audience.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/Meet-the-Authors.png" 
                alt="FCAO Founders and Authors" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES GRID */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-20 relative z-10">
        <h2 className="text-3xl font-heading font-extrabold mb-10 text-center text-neutral-900 dark:text-white">
          Our Core Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-brand-gold/30 transition-colors"
            >
              <div className="mb-4 bg-white dark:bg-black/20 w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">{item.title}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OFFICIAL STATEMENTS */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card !p-8 border-t-4 border-t-brand-blue"
          >
            <h2 className="text-2xl font-heading font-extrabold mb-6 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-white/10 pb-4">
              Mission Statement
            </h2>
            <ol className="list-decimal pl-5 space-y-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed marker:font-bold marker:text-brand-blue">
              <li>FCAO will support the production and promotion of inspiring Christian books, movie scripts, and films approved by FCAO which will glorify our Lord Jesus Christ and draw people to Him.</li>
              <li>FCAO will support any non-profit Armenian and non-Armenian Christian mission-based charitable organization, which has excellent track record and accountability and transparency policies, through its selection process.</li>
              <li>FCAO will give priority to supporting specific Christian missions and specific causes through Armenian and non-Armenian Christian organizations. Examples for a specific cause would be renovation of a particular church, construction of a community center, or providing financial support for families in a certain poor and deprived village in Armenia, or helping persecuted Christians worldwide. Financial support will be considered for reputable Christian mission organizations that are willing and open to provide their annual budget and financial records, and preferably organizations that have already been vetted by Charity Navigators and have received 3 stars or more.</li>
              <li>Net proceeds from Christian book or Christian film projects will provide the finances for FCAO’s support of mission organizations.</li>
              <li>FCAO will not support any political organization, or have any affiliation or involvement with any profit based business entity, or have any affiliation with a non-profit organization that is politically involved.</li>
              <li>FCAO will be governed by its Board of Directors, which will meet at least 4 times per year to evaluate the status of various projects, discuss new projects and ideas, review its financial records, and to resolve any issues or conflicts for the scope of its tasks.</li>
              <li>FCAO will conduct its financial business with utmost integrity and transparency and will also use independent auditors to ensure highest financial integrity.</li>
            </ol>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card !p-8 border-t-4 border-t-brand-gold"
          >
            <h2 className="text-2xl font-heading font-extrabold mb-6 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-white/10 pb-4">
              Statement of Faith
            </h2>
            <ol className="list-decimal pl-5 space-y-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed marker:font-bold marker:text-brand-gold">
              <li>We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son and Holy Spirit.</li>
              <li>We believe the Bible to be the inspired, authoritative Word of God, infallible and inerrant in its original writings. It is the complete revelation of His will for the salvation of men and the divine and final authority for all Christian faith and life.</li>
              <li>We believe that Jesus Christ is true God and true man, having been conceived of the Holy Spirit and born of the Virgin Mary. We believe in His sinless life, in His miracles, in His vicarious and atoning death through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father and in His personal return as King of Kings and Lord of Lords.</li>
              <li>We believe that man was created in the image of God but fell into sin and is therefore lost and out of God’s abundant love. Through regeneration by the Holy Spirit he can obtain salvation and eternal life. This salvation is by grace alone through the shed blood of Jesus Christ, the Son of God.</li>
              <li>We believe in the present ministry of the Holy Spirit by whose indwelling the Christian is enabled to live a godly life.</li>
              <li>We believe that Jesus Christ is the Lord and the Head of the Church, and that every local Church has the right under Christ to decide and govern its own affairs.</li>
              <li>We believe that the true Church is composed of all such persons who through saving faith in Jesus Christ have been regenerated by the Holy Spirit and are united together in the body of Christ of which He is the head.</li>
            </ol>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
