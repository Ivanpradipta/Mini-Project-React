import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD6a3mUwshGwutxmD8VPRv66923r2RLMcU",
  authDomain: "mini-project-39e9b.firebaseapp.com",
  databaseURL: "https://mini-project-39e9b-default-rtdb.firebaseio.com",
  projectId: "mini-project-39e9b",
  storageBucket: "mini-project-39e9b.appspot.com",
  messagingSenderId: "182835081251",
  appId: "1:182835081251:web:972c0428362dceee828196",
  measurementId: "G-TQV0H1XWLG",
  storageBucket: 'gs://mini-project-39e9b.appspot.com'

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app)

