import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBwGUx_V5Cpi8dRJTHE-XitJFL_xpB4ssQ",
  authDomain: "lab5-d2768.firebaseapp.com",
  projectId: "lab5-d2768",
  storageBucket: "lab5-d2768.appspot.com",
  messagingSenderId: "405384166218",
  appId: "1:405384166218:web:9d0f70e7c57b0555329fb3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();
export { auth, googleProvider, gitProvider };