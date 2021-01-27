import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCoTY1RMbiJ1B4wDgCXIA-pfI9JF1GOoKk",
    authDomain: "fsw-final.firebaseapp.com",
    projectId: "fsw-final",
    storageBucket: "fsw-final.appspot.com",
    messagingSenderId: "592110807488",
    appId: "1:592110807488:web:b903f09731f43c2b974025"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;