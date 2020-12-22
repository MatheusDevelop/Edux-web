import firebase from "firebase/app"
import "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDDyo0cDB93Op5RzRngY-R9o5-0GDDJi_c",
    authDomain: "edux-6c5be.firebaseapp.com",
    projectId: "edux-6c5be",
    storageBucket: "edux-6c5be.appspot.com",
    messagingSenderId: "79309061589",
    appId: "1:79309061589:web:cacfa70c3552453c9bd15c"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage ,firebase as default}