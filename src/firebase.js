import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJ9w_Gjsb6CJHpUz0WglVeJEYOdnVu6as",
  authDomain: "fir-1-81d27.firebaseapp.com",
  projectId: "fir-1-81d27",
  storageBucket: "fir-1-81d27.appspot.com",
  messagingSenderId: "297135719625",
  appId: "1:297135719625:web:39827f23100508b64eb918",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
