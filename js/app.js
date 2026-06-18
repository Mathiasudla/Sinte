import { loadComponent } from "./ui/componentLoader.js";
import { createKeyboard } from "./ui/piano.js";

import {
    increaseOctave,
    decreaseOctave
} from "./ui/octaveManager.js";

import {
    playNote,
    stopNote
} from "./audio/playNote.js";

import KEY_MAP from "./keyboard/keyboardControl.js";

import { startVisualizer } from "./ui/visualizer.js";
import { startVUMeter } from "./ui/vumeter.js";

import {
    setMasterVolume,
    audioContext
} from "./audio/audioEngine.js";

import {
    playNoise,
    stopNoise
} from "./audio/noise.js";

import {
    initAuth
} from "./firebase/auth.js";

window.addEventListener("DOMContentLoaded", async () => {

    await loadComponent("auth-container", "components/login.html");

    await loadComponent("header-container", "components/header.html");
    await loadComponent("osc1-container", "components/oscillator1.html");
    await loadComponent("osc2-container", "components/oscillator2.html");
    await loadComponent("osc3-container", "components/oscillator3.html");
    await loadComponent("noise-container", "components/noise.html");
    await loadComponent("master-container", "components/master-section.html");
    await loadComponent("piano-container", "components/piano.html");

    initAuth();

    createKeyboard();

    document.getElementById("octaveUp")?.addEventListener("click", () => {
        increaseOctave();
        createKeyboard();
    });

    document.getElementById("octaveDown")?.addEventListener("click", () => {
        decreaseOctave();
        createKeyboard();
    });

    document.getElementById("masterVolume")?.addEventListener("input", e => {
        setMasterVolume(e.target.value);
    });

    document.getElementById("noiseEnable")?.addEventListener("change", e => {
        if (e.target.checked) {
            playNoise();
        } else {
            stopNoise();
        }
    });

    document.getElementById("noiseType")?.addEventListener("change", () => {
        if (document.getElementById("noiseEnable")?.checked) {
            playNoise();
        }
    });

    document.getElementById("noiseVolume")?.addEventListener("input", () => {
        if (document.getElementById("noiseEnable")?.checked) {
            playNoise();
        }
    });

    startVisualizer();
    startVUMeter();
});

document.addEventListener(
    "click",
    async () => {
        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }
    },
    { once: true }
);

document.addEventListener("mousedown", e => {
    const key = e.target.closest("[data-note]");

    if (!key) return;

    playNote(key.dataset.note);
    key.classList.add("active-key");
});

document.addEventListener("mouseup", e => {
    const key = e.target.closest("[data-note]");

    if (!key) return;

    stopNote(key.dataset.note);
    key.classList.remove("active-key");
});

const NOTES = [
    "C", "C#", "D", "D#",
    "E", "F", "F#", "G",
    "G#", "A", "A#", "B",

    "C", "C#", "D", "D#",
    "E", "F"
];

const pressed = {};

document.addEventListener("keydown", e => {

    const key = (e.key || "").toLowerCase();

    if (pressed[key]) return;

    const idx = KEY_MAP[key];

    if (idx === undefined) return;

    pressed[key] = true;

    const octaveDisplay = document.getElementById("octaveDisplay");

    if (!octaveDisplay) return;

    const octaveText = octaveDisplay.textContent.replace("OCT ", "");
    const octave = Number(octaveText);

    const note =
        NOTES[idx] +
        (
            idx < 12
                ? octave
                : octave + 1
        );

    playNote(note);

    document
        .querySelector(`[data-note="${note}"]`)
        ?.classList.add("active-key");
});

document.addEventListener("keyup", e => {

    const key = (e.key || "").toLowerCase();

    const idx = KEY_MAP[key];

    if (idx === undefined) return;

    delete pressed[key];

    const octaveDisplay = document.getElementById("octaveDisplay");

    if (!octaveDisplay) return;

    const octaveText = octaveDisplay.textContent.replace("OCT ", "");
    const octave = Number(octaveText);

    const note =
        NOTES[idx] +
        (
            idx < 12
                ? octave
                : octave + 1
        );

    stopNote(note);

    document
        .querySelector(`[data-note="${note}"]`)
        ?.classList.remove("active-key");
});