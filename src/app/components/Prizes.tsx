"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Palette } from "lucide-react";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";
import { useState } from "react";

const prizes = [
  {
    icon: <Award className="w-8 h-8 text-secondary" />,
    title: "Runner Up",
    amount: "$25,000",
    description: "For exceptional technical achievement",
    confettiColors: ["#6366f1", "#4f46e5"],
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "Grand Prize",
    amount: "$50,000",
    description: "For the most innovative and impactful project",
    confettiColors: ["#6366f1", "#4f46e5"],
  },
  {
    icon: <Palette className="w-8 h-8 text-secondary" />,
    title: "Best UI/UX",
    amount: "$10,000",
    description: "For the most user-friendly and visually appealing project",
    confettiColors: ["#6366f1", "#4f46e5"],
  },
];

const HoverConfettiButton = ({ colors, children, className }: {
  colors: string[];
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isHovered) return;
    setIsHovered(true);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 50,
      spread: 60,
      colors: colors,
      ticks: 100,
      gravity: 0.7,
      scalar: 0.75,
      disableForReducedMotion: true,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      variant="ghost"
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </Button>
  );
};

const Prizes = () => {
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
          $1M+ in Prizes
        </h2>
        <p className="text-lg text-muted-foreground">
          Win big and get recognized for your innovative solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prizes.map((prize, index) => (
          <motion.div
            id={`prize-${index}`}
            key={index}
            className="relative rounded-[20px] bg-card border border-border p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                {prize.icon}
              </div>
              <h3 className="text-2xl font-normal text-foreground">
                {prize.title}
              </h3>
              <HoverConfettiButton
                className="bg-muted rounded-full px-6 py-2 text-xl text-foreground font-normal hover:bg-muted/90"
                colors={prize.confettiColors}
              >
                {prize.amount}
              </HoverConfettiButton>
              <p className="text-muted-foreground text-sm">
                {prize.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Prizes;
