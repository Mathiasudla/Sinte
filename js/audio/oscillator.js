// js/audio/oscillator.js

import {
    audioContext,
    masterGain
} from "./audioEngine.js";

import {
    applyADSR,
    releaseADSR
} from "./adsr.js";

import {
    createFilter
} from "./filter.js";

import {
    createLFO
} from "./lfo.js";

const activeNotes = {};

export function playOscillator(
    oscId,
    frequency,
    settings
) {

    const oscillator =
        audioContext.createOscillator();

    const gainNode =
        audioContext.createGain();

    const filter =
        createFilter(settings);

    oscillator.type =
        settings.wave;

    oscillator.frequency.value =
        frequency;

    gainNode.gain.value = 0;

    oscillator.connect(filter);

    filter.connect(gainNode);

    gainNode.connect(masterGain);

    oscillator.start();

    applyADSR(
        gainNode,
        settings.attack,
        settings.decay,
        settings.sustain
    );

    let lfoData = null;

    if (
        Number(settings.lfoDepth) > 0
    ) {

        switch (
            settings.lfoTarget
        ) {

            case "pitch":

                lfoData =
                    createLFO(
                        oscillator.frequency,
                        settings
                    );

                break;

            case "gain":

                lfoData =
                    createLFO(
                        gainNode.gain,
                        settings
                    );

                break;

            case "filter":

                lfoData =
                    createLFO(
                        filter.frequency,
                        settings
                    );

                break;
        }
    }

    activeNotes[oscId] = {

        oscillator,

        gainNode,

        filter,

        lfoData,

        release:
            settings.release

    };

}

export function stopOscillator(
    oscId
) {

    const note =
        activeNotes[oscId];

    if (!note) return;

    releaseADSR(
        note.gainNode,
        note.release
    );

    setTimeout(
        () => {

            try {

                if (
                    note.lfoData
                ) {

                    note.lfoData
                        .lfo
                        .stop();

                }

                note.oscillator.stop();

            } catch (error) {

                console.log(
                    error
                );

            }

            delete activeNotes[
                oscId
            ];

        },
        (
            note.release * 1000
        ) + 100
    );

}