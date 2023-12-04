
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBK7yzm4vO0lnW8h0YO__XSf2k8xa64I7I",
  authDomain: "gened-1080.firebaseapp.com",
  databaseURL: "https://gened-1080-default-rtdb.firebaseio.com",
  projectId: "gened-1080",
  storageBucket: "gened-1080.appspot.com",
  messagingSenderId: "99991126779",
  appId: "1:99991126779:web:9d23e74a137e438f0be65e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;