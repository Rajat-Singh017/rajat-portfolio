"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Layout, Database, PenTool, Layers, Sparkles } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Layout className="h-6 w-6 text-primary" />,
      skills: [
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "Next.js", level: 80 },
      ],
    },
    {
      title: "Backend Development",
      icon: <Database className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express", level: 75 },
        { name: "Firebase", level: 85 },
        { name: "SQL", level: 70 },
      ],
    },
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6 text-primary" />,
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 70 },
        { name: "Java", level: 65 },
      ],
    },
    {
      title: "Design",
      icon: <PenTool className="h-6 w-6 text-primary" />,
      skills: [
        { name: "UI/UX Design", level: 85 },
        { name: "Figma", level: 80 },
        { name: "Adobe XD", level: 75 },
        { name: "Photoshop", level: 70 },
      ],
    },
    {
      title: "Other Skills",
      icon: <Layers className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 70 },
        { name: "TDD", level: 75 },
        { name: "CI/CD", level: 70 },
      ],
    },
    {
      title: "Soft Skills",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Communication", level: 95 },
        { name: "Problem Solving", level: 90 },
        { name: "Team Work", level: 95 },
        { name: "Time Management", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg">
            Here are the technologies and tools I work with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level, delay }: Skill & { delay: number }) {
  const [width, setWidth] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      setWidth(level);
      controls.start("visible");
    }
  }, [controls, inView, level]);

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: { duration: 1, delay: delay, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: delay + 0.3 },
    },
  };

  return (
    <div className="space-y-2" ref={ref}>
      <div className="flex justify-between items-center">
        <motion.span
          className="text-sm font-medium"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          {name}
        </motion.span>
        <motion.span
          className="text-xs font-medium text-primary"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          variants={barVariants}
          initial="hidden"
          animate={controls}
        />
      </div>
    </div>
  );
} 