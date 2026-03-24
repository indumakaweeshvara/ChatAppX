import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Real Firebase configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyBI-Gnlm1DGgnUl8Y9Sl-d1AZIXeb0Stgo",
  authDomain: "chatappx-508f8.firebaseapp.com",
  projectId: "chatappx-508f8",
  storageBucket: "chatappx-508f8.firebasestorage.app",
  messagingSenderId: "683036303622",
  appId: "1:683036303622:web:a168587a4fa7237143fe87",
  measurementId: "G-3DY8FSXBDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
