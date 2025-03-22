"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Palette } from "lucide-react";

const prizes = [
  {
    icon: <Award className="w-8 h-8 text-gray-400" />,
    title: "Runner Up",
    amount: "$25,000",
    description: "For exceptional technical achievement",
  },
  {
    icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    title: "Grand Prize",
    amount: "$50,000",
    description: "For the most innovative and impactful project",
  },
  {
    icon: <Palette className="w-8 h-8 text-white" />,
    title: "Best UI/UX",
    amount: "$10,000",
    description: "For the most user-friendly and visually appealing project",
  },
];

const Prizes = () => {
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
          $1M+ in Prizes
        </h2>
        <p className="text-lg text-[#666666]">
          Win big and get recognized for your innovative solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prizes.map((prize, index) => (
          <motion.div
            key={index}
            className="relative rounded-[20px] bg-[#0A0A0A] border border-[#1A1A1A] p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center">
                {prize.icon}
              </div>
              <h3 className="text-2xl font-normal text-white">{prize.title}</h3>
              <div className="bg-[#1A1A1A] rounded-full px-6 py-2">
                <span className="text-xl text-white font-normal">
                  {prize.amount}
                </span>
              </div>
              <p className="text-[#666666] text-sm">{prize.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Prizes;
