// js/audio/playNote.js

import {
    playOscillator,
    stopOscillator
} from "./oscillator.js";

import {
    noteToFrequency
} from "./noteUtils.js";

import {
    getOsc1Settings
} from "./getOsc1Settings.js";

import {
    getOsc2Settings
} from "./getOsc2Settings.js";

import {
    getOsc3Settings
} from "./getOsc3Settings.js";

const activeNotes = new Set();

export function playNote(note) {

    if (activeNotes.has(note)) return;

    activeNotes.add(note);

    const freq = noteToFrequency(note);

    const osc1 =
        document.getElementById("osc1Enable");

    const osc2 =
        document.getElementById("osc2Enable");

    const osc3 =
        document.getElementById("osc3Enable");

    if (osc1 && osc1.checked) {

        playOscillator(
            `osc1-${note}`,
            freq,
            getOsc1Settings()
        );

    }

    if (osc2 && osc2.checked) {

        playOscillator(
            `osc2-${note}`,
            freq,
            getOsc2Settings()
        );

    }

    if (osc3 && osc3.checked) {

        playOscillator(
            `osc3-${note}`,
            freq,
            getOsc3Settings()
        );

    }
}

export function stopNote(note) {

    activeNotes.delete(note);

    stopOscillator(`osc1-${note}`);
    stopOscillator(`osc2-${note}`);
    stopOscillator(`osc3-${note}`);

}