"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/40 rounded-full blur-[150px] pointer-events-none" />


      {/* BANNER 2 IMAGES */}
      <div className="w-full flex border-y border-brand-gold/30 shadow-sm pointer-events-none bg-brand-light/50 dark:bg-[#12120e] relative z-20">
        <div className="relative w-1/2 h-[100px] md:h-[150px]">
          <Image 
            src="/images/banner.jpg" 
            alt="Armenian Saints Banner Left" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
        <div className="relative w-1/2 h-[100px] md:h-[150px]">
          <Image 
            src="/images/banner.jpg" 
            alt="Armenian Saints Banner Right" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
      </div>

      {/* INTRODUCTION SECTION */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          
          {/* LEFT: IMAGE */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-full aspect-[3/4] max-w-[500px] shadow-2xl rounded-sm overflow-hidden">
              <Image 
                src="/images/Armenian-Art-003.png" 
                alt="Armenian Art Portrait" 
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* RIGHT: TEXT & BUTTONS */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 font-serif text-center flex flex-col justify-center md:pl-8"
          >
            <h2 className="text-3xl lg:text-4xl font-serif mb-6 text-[#5b5b42] uppercase tracking-wide text-center">
              Introduction
            </h2>
            <div className="text-[#5b5b42] text-[17px] leading-relaxed text-center font-serif">
              <p>
                Founded in 2022, First Christian Alliance Outreach (FCAO) is a non-profit, non-denominational Christian organization which strives to: 1) promote Christian faith through the production of inspiring Christian books and films, and 2) support other Christian mission-based organizations. FCAO is governed by its board of directors and associates to ensure that its operations are conducted effectively and professionally with the utmost integrity.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <Link href="#mission-statement" className="bg-brand-gold hover:brightness-90 text-white px-7 py-2.5 rounded-full text-sm transition-all tracking-wide shadow-md">
                Mission Statement
              </Link>
              <Link href="#statement-of-faith" className="bg-brand-gold hover:brightness-90 text-white px-7 py-2.5 rounded-full text-sm transition-all tracking-wide shadow-md">
                Statement of Faith
              </Link>
            </div>
          </motion.div>
        </div>

        {/* CONSOLIDATED MISSION STATEMENT & STATEMENT OF FAITH */}
        <div className="w-full mt-24 space-y-24">
          {/* MISSION STATEMENT */}
          <div id="mission-statement" className="w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-serif mb-8 text-[#5b5b42] uppercase tracking-wide text-center"
            >
              Mission Statement
            </motion.h2>
            <motion.ol 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="list-decimal list-inside space-y-6 text-[#5b5b42] text-[17px] leading-relaxed font-serif max-w-5xl mx-auto text-center"
            >
              <li>FCAO will support the production and promotion of inspiring Christian books, movie scripts, and films approved by FCAO which will glorify our Lord Jesus Christ and draw people to Him.</li>
              <li>FCAO will support any non-profit Armenian and non-Armenian Christian mission-based charitable organization, which has excellent track record and accountability and transparency policies, through its selection process.</li>
              <li>FCAO will give priority to supporting specific Christian missions and specific causes through Armenian and non-Armenian Christian organizations. Examples for a specific cause would be renovation of a particular church, construction of a community center, or providing financial support for families in a certain poor and deprived village in Armenia, or helping persecuted Christians worldwide. Financial support will be considered for reputable Christian mission organizations that are willing and open to provide their annual budget and financial records, and preferably organizations that have already been vetted by Charity Navigators and have received 3 stars or more.</li>
              <li>Net proceeds from Christian book or Christian film projects will provide the finances for FCAO’s support of mission organizations.</li>
              <li>FCAO will not support any political organization, or have any affiliation or involvement with any profit based business entity, or have any affiliation with a non-profit organization that is politically involved.</li>
              <li>FCAO will be governed by its Board of Directors, which will meet at least 4 times per year to evaluate the status of various projects, discuss new projects and ideas, review its financial records, and to resolve any issues or conflicts for the scope of its tasks.</li>
              <li>FCAO will conduct its financial business with utmost integrity and transparency and will also use independent auditors to ensure highest financial integrity.</li>
            </motion.ol>
          </div>

          {/* STATEMENT OF FAITH */}
          <div id="statement-of-faith" className="w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-serif mb-8 text-[#5b5b42] uppercase tracking-wide text-center"
            >
              Statement of Faith
            </motion.h2>
            <motion.ol 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="list-decimal list-inside space-y-6 text-[#5b5b42] text-[17px] leading-relaxed font-serif max-w-5xl mx-auto text-center"
            >
              <li>We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son and Holy Spirit.</li>
              <li>We believe the Bible to be the inspired, authoritative Word of God, infallible and inerrant in its original writings. It is the complete revelation of His will for the salvation of men and the divine and final authority for all Christian faith and life.</li>
              <li>We believe that Jesus Christ is true God and true man, having been conceived of the Holy Spirit and born of the Virgin Mary. We believe in His sinless life, in His miracles, in His vicarious and atoning death through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father and in His personal return as King of Kings and Lord of Lords.</li>
              <li>We believe that man was created in the image of God but fell into sin and is therefore lost and out of God’s abundant love. Through regeneration by the Holy Spirit he can obtain salvation and eternal life. This salvation is by grace alone through the shed blood of Jesus Christ, the Son of God.</li>
              <li>We believe in the present ministry of the Holy Spirit by whose indwelling the Christian is enabled to live a godly life.</li>
              <li>We believe that Jesus Christ is the Lord and the Head of the Church, and that every local Church has the right under Christ to decide and govern its own affairs.</li>
              <li>We believe that the true Church is composed of all such persons who through saving faith in Jesus Christ have been regenerated by the Holy Spirit and are united together in the body of Christ of which He is the head.</li>
            </motion.ol>
          </div>
        </div>
      </section>
    </div>
  );
}
