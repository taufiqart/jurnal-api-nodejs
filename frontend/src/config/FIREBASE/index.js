// Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJVmMTbUh6OLb9diyJJRBig-SghgabDX0',
  authDomain: 'taufiqart-b26d9.firebaseapp.com',
  projectId: 'taufiqart-b26d9',
  storageBucket: 'taufiqart-b26d9.appspot.com',
  messagingSenderId: '176911849164',
  appId: '1:176911849164:web:bba586317597bd538e5469',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FIREBASE = getDatabase(app);
const authentication = getAuth(app);
const firestore = app.firestore;
export {app, FIREBASE, authentication, firestore};
