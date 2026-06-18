import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKcXa2P0WK8ai790ZSnA6Ivd1l62ZhUbw",
    authDomain: "sinte-20eb6.firebaseapp.com",
    projectId: "sinte-20eb6",
    storageBucket: "sinte-20eb6.firebasestorage.app",
    messagingSenderId: "24804008220",
    appId: "1:24804008220:web:a95be39b5f694ef1051ad9",
    measurementId: "G-2D112PTGMP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);