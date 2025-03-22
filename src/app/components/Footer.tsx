"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Create With
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Bolt.new
              </a>
            </li>
            <li>
              <a
                href="https://stackblitz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                StackBlitz
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {["Rules", "FAQ", "Code of Conduct"].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-muted-foreground">support@hackathon.com</li>
            <li className="text-muted-foreground">+1 (555) 123-4567</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">Follow Us</h3>
          <div className="flex space-x-4">
            {[Twitter, Linkedin, Github].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center text-foreground hover:bg-muted/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-border text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} World&apos;s Largest Hackathon. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
