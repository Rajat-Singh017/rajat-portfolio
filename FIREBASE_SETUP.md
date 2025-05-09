# Firebase Setup Guide

This document provides instructions on how to set up Firebase for your portfolio project.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the prompts
3. Give your project a name (e.g., "rajat-portfolio")
4. Enable Google Analytics if you want (optional)
5. Click "Create project"

## 2. Add a Web App to Your Firebase Project

1. In your Firebase project dashboard, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "rajat-portfolio-web")
3. Check the "Also set up Firebase Hosting" option if you plan to deploy with Firebase
4. Click "Register app"
5. You'll see your Firebase configuration - this will be used in your `.env.local` file

## 3. Set Up Firebase Authentication (Optional)

If you want to manage your projects or messages through an admin interface:

1. In the Firebase console, go to "Authentication" from the left sidebar
2. Click "Get started"
3. Enable the authentication methods you want to use (Email/Password is recommended for simple admin access)
4. Add your email and a secure password

## 4. Set Up Firestore Database

1. In the Firebase console, go to "Firestore Database" from the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (recommended)
4. Select a location closest to your target audience
5. Click "Enable"

## 5. Deploy Security Rules

1. In the Firebase console, go to "Firestore Database" → "Rules" tab
2. Copy and paste the contents of `firestore.rules` from this project
3. Click "Publish"

Alternatively, install the Firebase CLI and deploy rules from your local environment:

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

## 6. Set Up Your Environment Variables

1. Create a `.env.local` file in the root of your project
2. Copy the Firebase configuration from your Firebase project settings
3. Add them to the `.env.local` file following the format from `firebase-config-example.txt`

Example:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234
```

## 7. Seed Your Firebase with Initial Projects Data (Optional)

1. Install the required dependencies:
```bash
npm install dotenv
```

2. Run the seed script:
```bash
node scripts/seed-projects.js
```

## 8. Testing Your Firebase Integration

1. Run your development server:
```bash
npm run dev
```

2. Test the contact form to ensure messages are being stored in Firestore
3. Check that projects are being fetched and displayed correctly

## 9. Deploying to Firebase Hosting (Optional)

If you want to deploy your portfolio to Firebase Hosting:

1. Install the Firebase CLI if you haven't already:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```
   - Select "Hosting"
   - Select your Firebase project
   - Set the public directory to "out"
   - Configure as a single-page app: "No"
   - Set up automatic builds and deploys with GitHub: up to you

4. Build your Next.js project for static export:
```bash
next build && next export
```

5. Deploy to Firebase:
```bash
firebase deploy
```

## Troubleshooting

If you encounter issues:

1. **Projects not displaying**: Check your Firebase configuration in `.env.local` and ensure your Firestore database has projects collection
2. **Contact form not working**: Check the browser console for errors and ensure your Firestore rules allow creating messages
3. **Authentication issues**: Verify your Firebase Authentication configuration and rules

## Firebase Structure

This project uses the following Firestore collections:

- `projects`: Stores portfolio project information
- `messages`: Stores messages from the contact form

Each project document structure:
```
{
  id: string (auto-generated),
  title: string,
  description: string,
  technologies: array of strings,
  imageUrl: string,
  liveUrl: string,
  githubUrl: string
}
```

Each message document structure:
```
{
  id: string (auto-generated),
  name: string,
  email: string,
  subject: string (optional),
  message: string,
  createdAt: timestamp
}
``` 