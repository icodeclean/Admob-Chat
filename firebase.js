import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMpca_WakD72A6fhoeYvaZhiz0efsxQBw",
    authDomain: "mba2-87f18.firebaseapp.com",
    projectId: "mba2-87f18",
    storageBucket: "mba2-87f18.appspot.com",
    messagingSenderId: "709056200979",
    appId: "1:709056200979:web:817670d42e8b74d053dae6"
};

let app;

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

const auth = firebase.auth();
const DB = app.firestore();


export { DB, auth };
