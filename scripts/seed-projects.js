/**
 * This script can be used to seed your Firebase Firestore database with sample projects.
 * You'll need to run this script with Node.js after adding your Firebase credentials.
 * 
 * Steps to use:
 * 1. Create a Firebase project at https://console.firebase.google.com/
 * 2. Enable Firestore database in your Firebase project
 * 3. Make sure you have .env.local file with Firebase configuration
 * 4. Run this script using Node.js: node scripts/seed-projects.js
 */

require('dotenv').config({ path: '.env.local' }); // Load environment variables from .env.local
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Get Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Verify required configs are available
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Firebase configuration is missing. Please check your .env.local file.');
  process.exit(1);
}

// Sample projects data
const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores with analytics, inventory, and order management.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Firebase"],
    imageUrl: "/projects/project1.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Task Management App",
    description: "A productivity application to help teams organize tasks, track progress, and collaborate efficiently.",
    technologies: ["React", "TypeScript", "Express", "MongoDB"],
    imageUrl: "/projects/project2.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Portfolio Website",
    description: "A modern responsive portfolio site showcasing projects and skills with smooth animations.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    imageUrl: "/projects/project3.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Recipe Sharing Platform",
    description: "A social platform for food enthusiasts to share, discover and save cooking recipes with a vibrant community.",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Express"],
    imageUrl: "/projects/project4.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Weather Forecast App",
    description: "Real-time weather application with 7-day forecasts, location-based data, and customizable alerts.",
    technologies: ["React Native", "Redux", "Weather API", "Geolocation"],
    imageUrl: "/projects/project5.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Fitness Tracker",
    description: "A comprehensive fitness tracking application with workout plans, progress tracking, and nutrition logging.",
    technologies: ["Flutter", "Firebase", "Charts.js", "Node.js"],
    imageUrl: "/projects/project6.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  }
];

async function seedProjects() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('Adding projects to Firestore...');
    
    // Add each project to Firestore
    for (const project of projects) {
      const docRef = await addDoc(collection(db, "projects"), project);
      console.log(`Project "${project.title}" added with ID: ${docRef.id}`);
    }
    
    console.log('All projects have been added successfully!');
    
  } catch (error) {
    console.error('Error adding projects to Firestore:', error);
  }
}

// Run the seed function
seedProjects(); 