"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";

export function Hero() {
  const socialLinks = [
    { Icon: Github, href: "https://github.com", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-2"
            >
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-lg font-medium text-primary">Hello, I&apos;m Rajat</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block">Software Developer</span>
              <span className="block mt-2 text-primary">& Designer</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-foreground/80 max-w-lg"
            >
              I design and build beautiful digital experiences that help businesses grow and make people&apos;s lives easier.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild>
                <Link href="#projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">
                  Contact Me
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center gap-6 pt-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (index * 0.1), duration: 0.5 }}
                  aria-label={social.label}
                >
                  <social.Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full h-[400px] lg:h-[500px] order-first lg:order-last"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-primary/10 bg-gradient-to-br from-primary/5 to-background">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.12),transparent)]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[80%] max-h-[80%] mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden bg-primary/5 border border-primary/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary/20">
                        R
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 