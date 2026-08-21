// ==========================================
// FIREBASE.JS
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    serverTimestamp,
    doc,
    getDoc,
    runTransaction,
    onSnapshot,
    getDocs,
    deleteDoc,
    writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================
// CONFIGURAÇÃO DO FIREBASE
// ==========================================

const firebaseConfig = {

    apiKey:
        "AIzaSyBuqA7bxaME544_Sf5hmzj6Yw2X4dju15U",

    authDomain:
        "casamento-samuel-vitoria.firebaseapp.com",

    databaseURL:
        "https://casamento-samuel-vitoria-default-rtdb.firebaseio.com",

    projectId:
        "casamento-samuel-vitoria",

    storageBucket:
        "casamento-samuel-vitoria.firebasestorage.app",

    messagingSenderId:
        "908237089058",

    appId:
        "1:908237089058:web:2c5286d0da8b206cb6dd7b"

};


// ==========================================
// INICIALIZAÇÃO
// ==========================================

const app = initializeApp(
    firebaseConfig
);


const db = getFirestore(app);


const auth = getAuth(app);


// ==========================================
// EXPORTAÇÕES
// ==========================================

export {

    db,
    auth,
    collection,
    addDoc,
    setDoc,
    serverTimestamp,
    doc,
    getDoc,
    runTransaction,
    onSnapshot,
    getDocs,
    deleteDoc,
    writeBatch,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut

};