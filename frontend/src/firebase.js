// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAOOvSlWMoVKvWMptNmMdig0NObJOiQrnY",
  authDomain: "cybersecurity-bd401.firebaseapp.com",
  projectId: "cybersecurity-bd401",
  storageBucket: "cybersecurity-bd401.firebasestorage.app",
  messagingSenderId: "994855795110",
  appId: "1:994855795110:web:6ab071fd363ee6b11c3767"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
