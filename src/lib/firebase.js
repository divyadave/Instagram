import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
/* import { seedDatabase } from '../seed'; */


const config = {
    apiKey: "AIzaSyBUGlFLnwxAVOMijHbc54E0rQJXt6nLkZw",
    authDomain: "instagram-cb6ba.firebaseapp.com",
    projectId: "instagram-cb6ba",
    storageBucket: "instagram-cb6ba.appspot.com",
    messagingSenderId: "876421383073",
    appId: "1:876421383073:web:3cd29b6cbafc1aca90c1e0"
};



const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;
/* seedDatabase(firebase) */

export {firebase, FieldValue}
