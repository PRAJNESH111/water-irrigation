// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNNEpby8ExafLbX2jjBH_4uUi1E5eTVUc",
  authDomain: "waterirrigation2.firebaseapp.com",
  databaseURL: "https://waterirrigation2-default-rtdb.firebaseio.com",
  projectId: "waterirrigation2",
  storageBucket: "waterirrigation2.appspot.com",
  messagingSenderId: "1049001031315",
  appId: "1:1049001031315:web:286e4520e77f7bb3d4bf66",
  measurementId: "G-ERMQBEGC34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const waterRef = ref(database, "water");
const auth = getAuth(app);

export { database, waterRef ,auth};
