import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

 const app =initializeApp({
  apiKey: "AIzaSyDDZIRRCQ-fM8JvOtazb-TuPn4Jlqb9xio",
  authDomain: "comic-75ffa.firebaseapp.com",
  projectId: "comic-75ffa",
  storageBucket: "comic-75ffa.appspot.com",
  messagingSenderId: "733834499592",
  appId: "1:733834499592:web:922b1630d154a2af2423bd",
  measurementId: "G-JXZEN00PMX"
});


const storage = getStorage(app);
export default storage;
