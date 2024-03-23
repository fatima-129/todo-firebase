import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBupSWh4U8xumhWX7EBcp2lAm5oTOpln4U",
  authDomain: "toddo-9dfeb.firebaseapp.com",
  databaseURL: "https://toddo-9dfeb-default-rtdb.firebaseio.com",
  projectId: "toddo-9dfeb",
  storageBucket: "toddo-9dfeb.appspot.com",
  messagingSenderId: "897427011242",
  appId: "1:897427011242:web:eafa58ee13e569c3bbc2d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
