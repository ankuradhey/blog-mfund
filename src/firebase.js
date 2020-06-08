import firebase from "firebase/app";
import database from "firebase/database";

const config = {
    apiKey: "AIzaSyB6u6dFG_xlAwbY8yPlOF95vVDa43nUlZY",
    authDomain: "mutual-fund-blog.firebaseapp.com",
    databaseURL: "https://mutual-fund-blog.firebaseio.com",
    projectId: "mutual-fund-blog",
    storageBucket: "mutual-fund-blog.appspot.com",
    messagingSenderId: "336471272622",
    appId: "1:336471272622:web:03f12cc92d7a2ae015913f",
    measurementId: "G-KTTR82RMKM",
};

let firebaseCache;

export const getFirebase = () => {
    if (firebaseCache) {
        return firebaseCache;
    }

    firebase.initializeApp(config);
    firebaseCache = firebase;
    return firebase;
};
