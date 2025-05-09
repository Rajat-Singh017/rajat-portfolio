"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { Download } from "lucide-react";

export function About() {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "10+", label: "Happy Clients" },
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
    "Firebase", "Tailwind CSS", "UI/UX Design"
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg">
            Get to know more about me, my background, and what I do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Who am I?</h3>
            <p className="text-foreground/80">
              I&apos;m a passionate Software Developer & Designer based in [Your Location] with a strong focus 
              on creating intuitive and responsive web applications. With over 5 years of experience, 
              I specialize in modern frontend technologies and design systems.
            </p>
            <p className="text-foreground/80">
              My journey in tech began when I was in college, where I developed a fascination with how 
              design and technology could come together to create meaningful experiences. Since then, 
              I&apos;ve worked with various clients and companies to bring their digital visions to life.
            </p>
            <p className="text-foreground/80">
              When I&apos;m not coding, you can find me exploring new design trends, reading tech blogs, 
              or hiking in the great outdoors.
            </p>
            
            <Button variant="outline" size="lg" className="mt-4" asChild>
              <Link href="#" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Link>
            </Button>
          </motion.div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="text-center p-6 rounded-lg bg-background shadow-sm border border-border"
                >
                  <h4 className="text-3xl font-bold text-primary mb-2">{stat.value}</h4>
                  <p className="text-foreground/70 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold">My Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.05) }}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 