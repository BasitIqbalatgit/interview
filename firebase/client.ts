
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAkWnJhs_cL5zuqs0-DiT_nnVB2XOPOFG0",
    authDomain: "prepai-9cd97.firebaseapp.com",
    projectId: "prepai-9cd97",
    storageBucket: "prepai-9cd97.firebasestorage.app",
    messagingSenderId: "61267972921",
    appId: "1:61267972921:web:b663e4d05004a80d448ee8",
    measurementId: "G-NDHS6N4GT5"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);