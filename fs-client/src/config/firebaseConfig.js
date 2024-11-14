import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// It is OK to expose Firebase API Key: https://firebase.google.com/docs/projects/api-keys
//
// Security Rules have been added to Firebase Cloud Storage to allow admin SDK access only
//    https://firebase.google.com/docs/rules
//
// API Key Restriction have been added to allow calls to this API key from deployed
//    frontend website only: https://cloud.google.com/docs/authentication/api-keys#http
//
const firebaseConfig = {
  apiKey: "AIzaSyDkFtm8h8g9E2QXHbKXvjMr1E2fLyJ-CmI",
  authDomain: "cloud-file-storage-system.firebaseapp.com",
  projectId: "cloud-file-storage-system",
  storageBucket: "cloud-file-storage-system.firebasestorage.app",
  messagingSenderId: "232405050603",
  appId: "1:232405050603:web:ef57dd1379e36bdb070aae",
  measurementId: "G-0G59RE7MWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);