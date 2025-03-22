"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

const sponsors = [
  {
    name: "Supabase",
    logoSrc: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
    website: "https://supabase.com",
    description: "An open source Firebase alternative providing all the backend features you need to build a product.",
  },
  {
    name: "Netlify",
    logoSrc: "https://seeklogo.com/images/N/netlify-logo-BD8F8A77E2-seeklogo.com.png",
    website: "https://netlify.com",
    description: "An intuitive Git-based workflow and powerful serverless platform to build, deploy, and collaborate on web apps.",
  },
  {
    name: "Cloudflare",
    logoSrc: "https://seeklogo.com/images/C/cloudflare-logo-6B7069B50B-seeklogo.com.png",
    website: "https://cloudflare.com",
    description: "A global network designed to make everything you connect to the Internet secure, private, fast, and reliable.",
  },
  {
    name: "Sentry",
    logoSrc: "https://seeklogo.com/images/S/sentry-logo-36928B74C1-seeklogo.com.png",
    website: "https://sentry.io",
    description: "Error tracking and performance monitoring platform that helps developers see what actually matters.",
  },
  {
    name: "Vercel",
    logoSrc: "https://seeklogo.com/images/V/vercel-logo-F748E39008-seeklogo.com.png",
    website: "https://vercel.com",
    description: "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
  }
];

const Sponsors = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-black">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-6xl md:text-8xl font-normal text-white mb-4">
          Our Sponsors
        </h2>
        <p className="text-lg text-[#666666]">
          Backed by industry leaders in technology
        </p>
      </motion.div>

      <div className="relative flex items-center justify-center gap-8 py-12 overflow-hidden">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            className={`relative cursor-pointer ${selectedSponsor === index ? 'z-50' : 'z-0'}`}
            onClick={() => setSelectedSponsor(selectedSponsor === index ? null : index)}
            initial={false}
            animate={{
              scale: selectedSponsor === index ? 1.5 : 1,
              zIndex: selectedSponsor === index ? 50 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A] p-4 flex items-center justify-center">
              <img
                src={sponsor.logoSrc}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <AnimatePresence>
              {selectedSponsor === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 text-center shadow-xl"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSponsor(null);
                    }}
                    className="absolute top-4 right-4 text-white/50 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h3 className="text-xl font-normal text-white mb-2">{sponsor.name}</h3>
                  <p className="text-sm text-[#666666] mb-4">{sponsor.description}</p>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
