# Rajat's Portfolio

A modern, responsive portfolio website built with Next.js, Firebase, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- 🌓 Light/Dark mode support
- 📱 Fully responsive design for all devices
- ✨ Smooth animations with Framer Motion
- 🔥 Firebase integration for contact form and projects data
- 🎨 Modern UI components with shadcn/ui
- 🔧 Built with TypeScript for type safety

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion
- **Database**: Firebase Firestore
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for backend functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rajat-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore database in your project
3. Set up authentication if you plan to add admin features
4. Update your `.env.local` file with your Firebase configuration

### Seeding Project Data

This project includes a script to seed your Firestore database with sample projects:

1. Update the Firebase configuration in `scripts/seed-projects.js`
2. Run the script:
   ```bash
   node scripts/seed-projects.js
   ```

## Customization

### Personal Information

Update your personal information in the following files:

- **Hero Section**: `app/sections/Hero.tsx`
- **About Section**: `app/sections/About.tsx`
- **Skills Section**: `app/sections/Skills.tsx`
- **Contact Information**: `app/sections/Contact.tsx`
- **Footer**: `app/components/Footer.tsx`

### Adding Projects

You can add projects in two ways:

1. **Firebase**: Add projects through the Firebase console or update the seed script
2. **Locally**: Update the `fallbackProjects` array in `app/sections/Projects.tsx`

### Styling

- Main color schemes are defined in `app/globals.css`
- Component styles can be found in their respective files
- Tailwind configuration is in `tailwind.config.js`

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set environment variables in the Vercel dashboard
4. Deploy

### Other Hosting Providers

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the `.next` folder according to your hosting provider's instructions

## License

[MIT License](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase](https://firebase.google.com/)
- [Lucide Icons](https://lucide.dev/)
