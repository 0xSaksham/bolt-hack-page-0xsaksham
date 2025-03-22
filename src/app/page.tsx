"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import Prizes from "@/app/components/Prizes";
import Sponsors from "@/app/components/Sponsors";
import Judges from "@/app/components/Judges";
import Footer from "@/app/components/Footer";

export default function Home() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    });
  }, [controls]);

  return (
    <motion.main
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Features />
      <Prizes />
      <Sponsors />
      <Judges />
      <Footer />

      {/* Decorative elements */}
      <div
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 dark:bg-primary/5"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-1/3 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10 dark:bg-secondary/5"
        aria-hidden="true"
      />
    </motion.main>
  );
}
