// js/ui/piano.js

import { getCurrentOctave } from "./octaveManager.js";

const NOTES = [
    "C", "C#", "D", "D#",
    "E", "F", "F#", "G",
    "G#", "A", "A#", "B"
];

const BLACK_KEYS = [1, 3, 6, 8, 10];

export function createKeyboard() {

    const keyboard = document.getElementById("keyboard");

    if (!keyboard) return;

    keyboard.innerHTML = "";

    const startOctave = getCurrentOctave();

    let whiteIndex = 0;

    for (let octave = startOctave; octave < startOctave + 2; octave++) {

        NOTES.forEach((note, index) => {

            const fullNote = note + octave;

            const isBlack = BLACK_KEYS.includes(index);

            const key = document.createElement("div");

            key.dataset.note = fullNote;

            const label = document.createElement("span");

            label.textContent = fullNote;

            key.appendChild(label);

            if (isBlack) {

                key.classList.add("black-key");

                key.style.left = (whiteIndex * 60 - 20) + "px";

            } else {

                key.classList.add("white-key");

                whiteIndex++;

            }

            keyboard.appendChild(key);

        });

    }

}