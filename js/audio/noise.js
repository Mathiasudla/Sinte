// js/audio/noise.js

import {
    audioContext,
    masterGain
} from "./audioEngine.js";

let activeNoise = null;

function createWhiteNoiseBuffer() {

    const bufferSize =
        audioContext.sampleRate * 2;

    const buffer =
        audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    return buffer;
}

function createPinkNoiseBuffer() {

    const bufferSize =
        audioContext.sampleRate * 2;

    const buffer =
        audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );

    const data =
        buffer.getChannelData(0);

    let b0 = 0;
    let b1 = 0;
    let b2 = 0;

    for (let i = 0; i < bufferSize; i++) {

        const white =
            Math.random() * 2 - 1;

        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;

        data[i] =
            (b0 + b1 + b2 + white * 0.1848) * 0.05;
    }

    return buffer;
}

export function playNoise() {

    stopNoise();

    const enabled =
        document.getElementById("noiseEnable")?.checked;

    if (!enabled) return;

    const type =
        document.getElementById("noiseType").value;

    const volume =
        Number(
            document.getElementById("noiseVolume").value
        );

    const source =
        audioContext.createBufferSource();

    const gain =
        audioContext.createGain();

    source.buffer =
        type === "pink"
            ? createPinkNoiseBuffer()
            : createWhiteNoiseBuffer();

    source.loop = true;

    gain.gain.value = volume;

    source.connect(gain);
    gain.connect(masterGain);

    source.start();

    activeNoise = {
        source,
        gain
    };
}

export function stopNoise() {

    if (!activeNoise) return;

    try {
        activeNoise.source.stop();
    } catch (error) {}

    activeNoise = null;
}