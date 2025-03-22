"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const judges = [
  {
    name: "Theo",
    handle: "@theo",
    image: "https://unavatar.io/twitter/theo",
    testimonial:
      "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
  },
  {
    name: "Evan You",
    handle: "@sofiami",
    image: "https://unavatar.io/twitter/youyuxi",
    testimonial:
      "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive.",
  },
  {
    name: "KP",
    handle: "@theo",
    image: "https://unavatar.io/twitter/thisiskp_",
    testimonial:
      "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
  },
];

const Judges = () => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-black">
      <motion.div
        className="text-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-6xl md:text-8xl font-normal text-white mb-6">
          Meet Our Distinguished Judges
        </h2>
        <p className="text-lg text-[#666666] max-w-3xl mx-auto">
          Our panel of industry experts will evaluate submissions based on
          innovation, technical implementation, and real-world impact
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {judges.map((judge, index) => (
          <motion.div
            key={index}
            className="relative rounded-[20px] bg-[#0A0A0A] border border-[#1A1A1A] p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-full border border-[#1A1A1A]">
                  <AvatarImage src={judge.image} alt={judge.name} />
                  <AvatarFallback>{judge.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-normal text-white">
                    {judge.name}
                  </h3>
                  <p className="text-sm text-[#666666]">{judge.handle}</p>
                </div>
              </div>
              <p className="text-[#666666] text-base leading-relaxed">
                {judge.testimonial}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Judges;
