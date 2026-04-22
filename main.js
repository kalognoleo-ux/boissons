// Main entry point for Vite
import { auth, db, app } from './firebase-config.js';

// Make Firebase services globally available
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseApp = app;

// Import the main app
import './scripts/app.js';

console.log('✅ DépôtConnect app initialized with Vite');
