import firebase from "firebase/app";
import database from "firebase/database";

const config = {};

let firebaseCache;

export const getFirebase = () => {
    if (firebaseCache) {
        return firebaseCache;
    }

    firebase.initializeApp(config);
    firebaseCache = firebase;
    return firebase;
};
