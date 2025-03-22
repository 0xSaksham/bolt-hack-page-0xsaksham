"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";

const sponsors = [
  {
    name: "Supabase",
    logoSrc: "supabase-seeklogo.svg",
    website: "https://supabase.com",
    description:
      "An open source Firebase alternative providing all the backend features you need to build a product.",
  },
  {
    name: "Netlify",
    logoSrc: "netlify-icon-seeklogo.svg",
    website: "https://netlify.com",
    description:
      "An intuitive Git-based workflow and powerful serverless platform to build, deploy, and collaborate on web apps.",
  },
  {
    name: "Cloudflare",
    logoSrc: "cloudflare-seeklogo.svg",
    website: "https://cloudflare.com",
    description:
      "A global network designed to make everything you connect to the Internet secure, private, fast, and reliable.",
  },
  {
    name: "Sentry",
    logoSrc: "sentry-seeklogo.svg",
    website: "https://sentry.io",
    description:
      "Error tracking and performance monitoring platform that helps developers see what actually matters.",
  },
  {
    name: "Vercel",
    logoSrc:
      "vercel-seeklogo.svg",
    website: "https://vercel.com",
    description:
      "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
  },
];

const Sponsors = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-background">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-6xl md:text-8xl font-normal text-foreground mb-4">
          Our Sponsors
        </h2>
        <p className="text-lg text-muted-foreground">
          Backed by industry leaders in technology
        </p>
      </motion.div>

      <div className="relative flex items-center justify-center gap-8 py-12 overflow-hidden">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            className={`relative cursor-pointer ${
              selectedSponsor === index ? "z-50" : "z-0"
            }`}
            onClick={() =>
              setSelectedSponsor(selectedSponsor === index ? null : index)
            }
            initial={false}
            animate={{
              scale: selectedSponsor === index ? 1.5 : 1,
              zIndex: selectedSponsor === index ? 50 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-card border border-border p-4 flex items-center justify-center hover:border-primary/50 transition-colors">
              <Image
                src={sponsor.logoSrc}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain"
                width={100}
                height={100}
              />
            </div>

            <AnimatePresence>
              {selectedSponsor === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-card border border-border rounded-2xl p-6 text-center shadow-xl"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSponsor(null);
                    }}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h3 className="text-xl font-normal text-foreground mb-2">
                    {sponsor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {sponsor.description}
                  </p>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
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
