"use client";

import { motion } from "framer-motion";
import { Heart, Globe, BookOpen, Shield, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/40 rounded-full blur-[150px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-40 pb-20 md:pt-56 md:pb-32 flex flex-col items-center justify-center text-center z-10 min-h-[90vh]">
        {/* ENHANCED BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/enhanced_avarayr.png"
            alt="Enhanced Historical Christian Battle Background"
            fill
            className="object-cover opacity-30 dark:opacity-40 select-none pointer-events-none"
            priority
          />
          {/* Gradients to blend the image smoothly into the background */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/80 via-transparent to-neutral-50 dark:from-neutral-950/80 dark:via-transparent dark:to-neutral-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/50 via-transparent to-neutral-50/50 dark:from-neutral-950/50 dark:via-transparent dark:to-neutral-950/50" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 font-heading text-xl md:text-2xl font-bold tracking-widest uppercase mb-4 text-brand-gold drop-shadow-md"
        >
          First Christians Alliance Outreach
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl leading-tight text-neutral-900 dark:text-white drop-shadow-xl"
        >
          Bringing Christ’s Light to <br className="hidden md:block" />
          <span className="text-gradient">a New Generation.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-lg md:text-xl text-neutral-800 dark:text-neutral-200 font-medium max-w-2xl mb-12 leading-relaxed drop-shadow-md"
        >
          Founded in 2022, First Christian Alliance Outreach is a non-profit,
          non-denominational organization striving to promote Christian faith
          through inspiring books/films and supporting mission-based
          organizations globally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button className="bg-brand-gold hover:bg-brand-gold-glow text-white dark:text-neutral-950 font-bold px-8 py-3.5 rounded-full shadow-xl shadow-brand-gold/25 flex items-center gap-2 transition-all hover:-translate-y-1">
            Join Our Mission <ChevronRight className="w-5 h-5" />
          </button>
          <button className="glass hover:bg-neutral-200/50 dark:hover:bg-white/10 text-neutral-800 dark:text-white font-medium px-8 py-3.5 rounded-full flex items-center gap-2 transition-all hover:-translate-y-1">
            Explore Ministries
          </button>
        </motion.div>
      </section>

      {/* THREE PILLARS (Impact cards) */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemAnim}
            className="glass-card group hover:bg-neutral-100/50 dark:hover:bg-white/10 transition-colors duration-500"
          >
            <div className="bg-brand-gold/20 text-brand-gold dark:text-brand-gold-glow w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3 text-neutral-900 dark:text-white">
              Global Outreach
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              Extending the message of hope across borders, supporting
              missionaries, and funding global relief projects.
            </p>
          </motion.div>

          <motion.div
            variants={itemAnim}
            className="glass-card group hover:bg-neutral-100/50 dark:hover:bg-white/10 transition-colors duration-500 relative overflow-hidden"
          >
            {/* Subtle glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="bg-brand-blue/20 text-brand-blue dark:text-brand-blue w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3 text-neutral-900 dark:text-white">
              Biblical Teaching
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              Rooted in scripture, offering online resources, recorded sermons,
              and modern study guides.
            </p>
          </motion.div>

          <motion.div
            variants={itemAnim}
            className="glass-card group hover:bg-neutral-100/50 dark:hover:bg-white/10 transition-colors duration-500"
          >
            <div className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3 text-neutral-900 dark:text-white">
              Community Care
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              Fostering local connections, providing aid, and building a
              supportive congregation powered by donations.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CORE MISSION STATEMENT & STATEMENT OF FAITH */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-heading font-extrabold mb-8 text-neutral-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-gold rounded-full" /> Mission
              Statement
            </h2>
            <ul className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold shrink-0">1.</span>
                <p>
                  FCAO will support the production and promotion of inspiring
                  Christian books, movie scripts, and films approved by FCAO
                  which will glorify our Lord Jesus Christ and draw people to
                  Him.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold shrink-0">2.</span>
                <p>
                  FCAO will support any non-profit Armenian and non-Armenian
                  Christian mission-based charitable organization, which has
                  excellent track record and accountability and transparency
                  policies, through its selection process.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold shrink-0">3.</span>
                <p>
                  FCAO will give priority to supporting specific Christian
                  missions and specific causes through Armenian and non-Armenian
                  Christian organizations. Examples for a specific cause would
                  be renovation of a particular church, construction of a
                  community center, or providing financial support for families
                  in a certain poor and deprived village in Armenia, or helping
                  persecuted Christians worldwide. Financial support will be
                  considered for reputable Christian mission organizations that
                  are willing and open to provide their annual budget and
                  financial records, and preferably organizations that have
                  already been vetted by Charity Navigators and have received 3
                  stars or more.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold shrink-0">4.</span>
                <p>
                  Net proceeds from Christian book or Christian film projects
                  will provide the finances for FCAO’s support of mission
                  organizations.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold shrink-0">5.</span>
                <p>
                  FCAO will not support any political organization, or have any
                  affiliation or involvement with any profit based business
                  entity, or have any affiliation with a non-profit organization
                  that is politically involved.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold shrink-0">6.</span>
                <p>
                  FCAO will be governed by its Board of Directors, which will
                  meet at least 4 times per year to evaluate the status of
                  various projects, discuss new projects and ideas, review its
                  financial records, and to resolve any issues or conflicts for
                  the scope of its tasks.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold shrink-0">7.</span>
                <p>
                  FCAO will conduct its financial business with utmost integrity
                  and transparency and will also use independent auditors to
                  ensure highest financial integrity.
                </p>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-heading font-extrabold mb-8 text-neutral-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-gold rounded-full" /> Statement
              of Faith
            </h2>
            <ul className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p>
                  We believe in one God, Creator of all things, infinitely
                  perfect and eternally existing in three persons: Father, Son
                  and Holy Spirit.
                </p>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p>
                  We believe the Bible to be the inspired, authoritative Word of
                  God, infallible and inerrant in its original writings. It is
                  the complete revelation of His will for the salvation of men
                  and the divine and final authority for all Christian faith and
                  life.
                </p>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p>
                  We believe that Jesus Christ is true God and true man, having
                  been conceived of the Holy Spirit and born of the Virgin Mary.
                  We believe in His sinless life, in His miracles, in His
                  vicarious and atoning death through His shed blood, in His
                  bodily resurrection, in His ascension to the right hand of the
                  Father and in His personal return as King of Kings and Lord of
                  Lords.
                </p>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p>
                  We believe that man was created in the image of God but fell
                  into sin and is therefore lost and out of God’s abundant love.
                  Through regeneration by the Holy Spirit he can obtain
                  salvation and eternal life. This salvation is by grace alone
                  through the shed blood of Jesus Christ, the Son of God.
                </p>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p>
                  We believe in the present ministry of the Holy Spirit by whose
                  indwelling the Christian is enabled to live a godly life.
                </p>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p>
                  We believe that Jesus Christ is the Lord and the Head of the
                  Church, and that every local Church has the right under Christ
                  to decide and govern its own affairs.
                </p>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p>
                  We believe that the true Church is composed of all such
                  persons who through saving faith in Jesus Christ have been
                  regenerated by the Holy Spirit and are united together in the
                  body of Christ of which He is the head.
                </p>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
