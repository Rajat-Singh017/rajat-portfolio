"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];
  
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:your-email@example.com", label: "Email" },
  ];

  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-border">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold">Rajat</Link>
            <p className="text-foreground/70 max-w-xs">
              A passionate software developer focused on creating modern, responsive web applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary border border-border transition-colors duration-200"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="md:ml-auto">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <p className="flex items-center text-foreground/70">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                yourname@example.com
              </p>
              <p className="text-foreground/70">
                <span className="flex items-center">
                  <span className="text-primary mr-2">Location:</span> 
                  Your City, Country
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 text-center text-foreground/70">
          <p>
            © {currentYear} Rajat Portfolio. All Rights Reserved.
          </p>
          <p className="text-sm mt-2">
            Designed & Developed with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
} 