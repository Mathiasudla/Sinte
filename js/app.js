import { loadComponent } from "./ui/componentLoader.js";

import {
    createKeyboard
} from "./ui/piano.js";

import {
    increaseOctave,
    decreaseOctave
} from "./ui/octaveManager.js";

import {
    playNote,
    stopNote
} from "./audio/playNote.js";

import KEY_MAP from "./keyboard/keyboardControl.js";

import {
    startVisualizer
} from "./ui/visualizer.js";

import {
    startVUMeter
} from "./ui/vumeter.js";

import {
    setMasterVolume,
    audioContext
} from "./audio/audioEngine.js";

window.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadComponent(
            "header-container",
            "components/header.html"
        );

        await loadComponent(
            "osc1-container",
            "components/oscillator1.html"
        );

        await loadComponent(
            "osc2-container",
            "components/oscillator2.html"
        );

        await loadComponent(
            "osc3-container",
            "components/oscillator3.html"
        );

        await loadComponent(
            "master-container",
            "components/master-section.html"
        );

        await loadComponent(
            "piano-container",
            "components/piano.html"
        );

        createKeyboard();

        document
            .getElementById("octaveUp")
            ?.addEventListener(
                "click",
                () => {

                    increaseOctave();
                    createKeyboard();

                }
            );

        document
            .getElementById("octaveDown")
            ?.addEventListener(
                "click",
                () => {

                    decreaseOctave();
                    createKeyboard();

                }
            );

        const volumeSlider =
            document.getElementById(
                "masterVolume"
            );

        volumeSlider
            ?.addEventListener(
                "input",
                e => {

                    setMasterVolume(
                        e.target.value
                    );

                }
            );

        startVisualizer();
        startVUMeter();

    }
);

document.addEventListener(
    "click",
    async () => {

        if (
            audioContext.state ===
            "suspended"
        ) {

            await audioContext.resume();

        }

    },
    { once: true }
);

document.addEventListener(
    "mousedown",
    e => {

        const key =
            e.target.closest(
                "[data-note]"
            );

        if (!key) return;

        playNote(
            key.dataset.note
        );

    }
);

document.addEventListener(
    "mouseup",
    e => {

        const key =
            e.target.closest(
                "[data-note]"
            );

        if (!key) return;

        stopNote(
            key.dataset.note
        );

    }
);

const NOTES = [

    "C", "C#", "D", "D#",
    "E", "F", "F#", "G",
    "G#", "A", "A#", "B",

    "C", "C#", "D", "D#",
    "E", "F"

];

const pressed = {};

document.addEventListener(
    "keydown",
    e => {

        if (
            pressed[e.key]
        ) return;

        const idx =
            KEY_MAP[e.key];

        if (
            idx === undefined
        ) return;

        pressed[e.key] = true;

        const octave =
            document
                .getElementById(
                    "octaveDisplay"
                )
                .textContent
                .replace(
                    "OCT ",
                    ""
                );

        const note =
            NOTES[idx]
            +
            (
                idx < 12
                    ? octave
                    : Number(octave) + 1
            );

        playNote(note);

    }
);

document.addEventListener(
    "keyup",
    e => {

        const idx =
            KEY_MAP[e.key];

        if (
            idx === undefined
        ) return;

        delete pressed[e.key];

        const octave =
            document
                .getElementById(
                    "octaveDisplay"
                )
                .textContent
                .replace(
                    "OCT ",
                    ""
                );

        const note =
            NOTES[idx]
            +
            (
                idx < 12
                    ? octave
                    : Number(octave) + 1
            );

        stopNote(note);

    }
);