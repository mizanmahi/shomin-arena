import { initializeApp } from 'firebase/app';

// app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyDbEbwRdYxBamfMeHZ9cpmKg2ZKJ97MADo',
   authDomain: 'shomin-arena.firebaseapp.com',
   projectId: 'shomin-arena',
   storageBucket: 'shomin-arena.appspot.com',
   messagingSenderId: '324747759177',
   appId: '1:324747759177:web:94656b89bd88876282f998',
};

// Initialize Firebase
const initializeFirebase = () => initializeApp(firebaseConfig);
export default initializeFirebase;
