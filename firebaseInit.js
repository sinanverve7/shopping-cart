// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgOHMKTjpAHXXvzKwuNsiWYmHzdjiYppA",
  authDomain: "react-native-38899.firebaseapp.com",
  projectId: "react-native-38899",
  storageBucket: "react-native-38899.appspot.com",
  messagingSenderId: "315893860460",
  appId: "1:315893860460:web:62fd738f3b304e9eb5f049",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
