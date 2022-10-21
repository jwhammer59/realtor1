// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDRFOZi0aFa6GrDKiayDX30scT8Ai2cIPo',
  authDomain: 'react-projects-d425f.firebaseapp.com',
  projectId: 'react-projects-d425f',
  storageBucket: 'react-projects-d425f.appspot.com',
  messagingSenderId: '269202074207',
  appId: '1:269202074207:web:7afc656c1736f0c02849ea',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
