// ==========================================
// FIREBASE
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    doc,
    runTransaction,
    onSnapshot,
    getDocs,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================
// CONFIGURAÇÃO
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
// INICIAR
// ==========================================

const app =
    initializeApp(firebaseConfig);


const db =
    getFirestore(app);


const auth =
    getAuth(app);


// ==========================================
// EXPORTAR
// ==========================================

export {

    db,

    auth,

    collection,

    addDoc,

    serverTimestamp,

    doc,

    runTransaction,

    onSnapshot,

    getDocs,

    deleteDoc,

    signInWithEmailAndPassword,

    onAuthStateChanged,

    signOut

};