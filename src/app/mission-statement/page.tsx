"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MissionStatement() {
  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-6"
      >
        <h1 className="text-3xl lg:text-4xl font-serif mb-2 text-[#5b5b42] uppercase tracking-wide text-center">
          Mission Statement
        </h1>
        <p className="text-center text-sm text-neutral-500 mb-10 font-serif">
          Mission Statement for First Christians Alliance Outreach (FCAO)
        </p>

        <ol className="list-decimal list-outside pl-6 space-y-6 text-[#5b5b42] text-[17px] leading-relaxed font-serif max-w-3xl mx-auto">
          <li>FCAO will support the production and promotion of inspiring Christian books, movie scripts, and films approved by FCAO which will glorify our Lord Jesus Christ and draw people to Him.</li>
          <li>FCAO will support any non-profit Armenian and non-Armenian Christian mission-based charitable organization, which has excellent track record and accountability and transparency policies, through its selection process.</li>
          <li>FCAO will give priority to supporting specific Christian missions and specific causes through Armenian and non-Armenian Christian organizations. Examples for a specific cause would be renovation of a particular church, construction of a community center, or providing financial support for families in a certain poor and deprived village in Armenia, or helping persecuted Christians worldwide. Financial support will be considered for reputable Christian mission organizations that are willing and open to provide their annual budget and financial records, and preferably organizations that have already been vetted by Charity Navigators and have received 3 stars or more.</li>
          <li>Net proceeds from Christian book or Christian film projects will provide the finances for FCAO&apos;s support of mission organizations.</li>
          <li>FCAO will not support any political organization, or have any affiliation or involvement with any profit based business entity, or have any affiliation with a non-profit organization that is politically involved.</li>
          <li>FCAO will be governed by its Board of Directors, which will meet at least 4 times per year to evaluate the status of various projects, discuss new projects and ideas, review its financial records, and to resolve any issues or conflicts for the scope of its tasks.</li>
          <li>FCAO will conduct its financial business with utmost integrity and transparency and will also use independent auditors to ensure highest financial integrity.</li>
        </ol>

        <div className="flex gap-4 justify-center mt-12">
          <Link href="/" className="bg-brand-gold hover:brightness-90 text-white px-7 py-2.5 rounded-full text-sm font-sans transition-all tracking-wide shadow-md">
            Back to Home
          </Link>
          <Link href="/statement-of-faith" className="bg-brand-gold hover:brightness-90 text-white px-7 py-2.5 rounded-full text-sm font-sans transition-all tracking-wide shadow-md">
            Statement of Faith →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
