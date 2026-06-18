import { auth, db } from "./firebaseConfig.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

export function initAuth() {

    const emailInput = document.getElementById("authEmail");
    const passwordInput = document.getElementById("authPassword");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const message = document.getElementById("authMessage");

    function showError(error) {
        console.error(error);

        message.textContent =
            `${error.code}: ${error.message}`;

        alert(
            error.code +
            "\n\n" +
            error.message
        );
    }

    loginBtn?.addEventListener("click", async () => {
        try {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                message.textContent = "Ingresa correo y contraseña.";
                return;
            }

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.textContent = "Sesión iniciada correctamente";

        } catch (error) {
            showError(error);
        }
    });

    registerBtn?.addEventListener("click", async () => {
        try {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                message.textContent = "Ingresa correo y contraseña.";
                return;
            }

            if (password.length < 6) {
                message.textContent = "La contraseña debe tener mínimo 6 caracteres.";
                return;
            }

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp()
            });

            message.textContent = "Cuenta creada correctamente";

        } catch (error) {
            showError(error);
        }
    });

    onAuthStateChanged(auth, user => {

        const synthApp = document.getElementById("synthApp");
        const loginScreen = document.querySelector(".login-screen");

        if (user) {
            synthApp.style.display = "block";

            if (loginScreen) {
                loginScreen.style.display = "none";
            }
        } else {
            synthApp.style.display = "none";

            if (loginScreen) {
                loginScreen.style.display = "flex";
            }
        }
    });
}

export async function logoutUser() {
    await signOut(auth);
}