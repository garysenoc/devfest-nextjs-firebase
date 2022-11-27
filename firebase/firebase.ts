// Import the functions you need from the SDKs you need

// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyAi5Fyt_kbFNHbhEnNM8BPgdamga5X-K1c',
  authDomain: 'sample-project-6a994.firebaseapp.com',
  projectId: 'sample-project-6a994',
  storageBucket: 'sample-project-6a994.appspot.com',
  messagingSenderId: '141587780193',
  appId: '1:141587780193:web:214447e9b0940a354c9020',
  measurementId: 'G-49HZT768JJ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);

