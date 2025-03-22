"use client";

import { motion } from "framer-motion";
import { Globe, Search, Sparkles, Trophy, DollarSign } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    title: "World Record Attempt",
    description:
      "This hackathon is aiming to win the Guinness Book of World Records by bringing together 100k+ builders to build simultaneously.",
    area: "md:col-span-8 xl:col-span-5",
  },
  {
    icon: <Globe className="h-5 w-5 text-blue-500" />,
    title: "100% Virtual Event",
    description:
      "Join from anywhere in the world - no travel required. Connect with participants globally through our online platform.",
    area: "md:col-span-4 xl:col-span-7",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    title: "Organized by Bolt.new",
    description:
      "Join the hackathon powered by Bolt.new, the most advanced AI code editor designed for modern developers.",
    area: "md:col-span-6",
  },
  {
    icon: <Search className="h-5 w-5 text-red-500" />,
    title: "From Tweet to Reality",
    description:
      "Started as a simple tweet idea was transformed into the first-ever hackathon of its kind within hours by CEO Eric Simons.",
    area: "md:col-span-12",
  },
  {
    icon: <DollarSign className="h-5 w-5 text-green-500" />,
    title: "$1M+ in Prizes",
    description:
      "Compete for over $1 million in prizes across various categories and challenge tracks.",
    area: "md:col-span-6",
  },
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  area: string;
}

const FeatureCard = ({ icon, title, description, area }: FeatureCardProps) => {
  return (
    <motion.div
      className={cn("relative", area)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative rounded-[20px] bg-[#0A0A0A] border border-[#1A1A1A] p-6 h-full">
        <div className="flex flex-col gap-4">
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center">
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-[20px] font-normal text-white">{title}</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-black">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <motion.div
        className="relative mt-32 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-6xl md:text-8xl font-normal text-white mb-4">
          $1M+ in Prizes
        </h2>
        <p className="text-lg text-[#666666]">
          Win big and get recognized for your innovative solutions
        </p>
      </motion.div>
    </section>
  );
};

export default Features;
