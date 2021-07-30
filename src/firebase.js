import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwq-tcw9nS84VyWYoWgBwMu_LgdFg3iag",
    authDomain: "nikhil-linkedin-clone.firebaseapp.com",
    projectId: "nikhil-linkedin-clone",
    storageBucket: "nikhil-linkedin-clone.appspot.com",
    messagingSenderId: "704900920022",
    appId: "1:704900920022:web:d5703d10ad12bc5f6b0f77",
    measurementId: "G-0HB5DSP3F0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider, storage};

export default db;