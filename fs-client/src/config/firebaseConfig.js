import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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