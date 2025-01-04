// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRje58HQuDwdfz8ErT4YbXshHYdUw4qCQ",
  authDomain: "mlb--hackathon.firebaseapp.com",
  projectId: "mlb--hackathon",
  storageBucket: "mlb--hackathon.firebasestorage.app",
  messagingSenderId: "499360245695",
  appId: "1:499360245695:web:b0964fc4229ae52ed6a30a",
  measurementId: "G-S4XZ6ZYLY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export initialized services
export { app, analytics, db, auth };
