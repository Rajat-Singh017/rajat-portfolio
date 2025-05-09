"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
}

// Fallback projects in case Firebase isn't set up yet
const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores with analytics, inventory, and order management.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Firebase"],
    imageUrl: "/projects/project1.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A productivity application to help teams organize tasks, track progress, and collaborate efficiently.",
    technologies: ["React", "TypeScript", "Express", "MongoDB"],
    imageUrl: "/projects/project2.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "A modern responsive portfolio site showcasing projects and skills with smooth animations.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    imageUrl: "/projects/project3.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic import of Firebase to avoid SSR issues
    const fetchProjects = async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("@/app/firebase");
        
        const projectsCollection = collection(db, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);
        
        if (!projectsSnapshot.empty) {
          const projectsList = projectsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];
          
          setProjects(projectsList);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Already using fallback projects as default state
      } finally {
        setLoading(false);
      }
    };

    // Only run Firebase code in the browser
    if (typeof window !== 'undefined') {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/70 text-lg">
            Explore some of my recent work and personal projects.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="group bg-background border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-60 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Project Image</span>
                  </div>
                  {project.imageUrl && (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight className="mr-1 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-4 w-4" /> Code
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
} 