import { initializeApp } from "@firebase/app";

const config = {
  apiKey: "AIzaSyCxu5QY13NTwrfyHRtdg5gTSyx1yfeGx4s",
  authDomain: "todolistapp-86e03.firebaseapp.com",
  projectId: "todolistapp-86e03",
  storageBucket: "todolistapp-86e03.appspot.com",
  messagingSenderId: "134437110366",
  appId: "1:134437110366:android:e216a93ec5e648dd856acf",
  measurementId: "G-XXXXXXXXXX",
};

const firebaseConfig = () => {
  initializeApp(config);
};

export { firebaseConfig };
