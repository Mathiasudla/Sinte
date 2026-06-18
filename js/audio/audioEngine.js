// js/audio/audioEngine.js

export const audioContext =
new (
    window.AudioContext ||
    window.webkitAudioContext
)();

export const masterGain =
audioContext.createGain();

export const analyser =
audioContext.createAnalyser();

analyser.fftSize = 2048;

masterGain.gain.value = 0.8;

masterGain.connect(analyser);

analyser.connect(
    audioContext.destination
);

export function setMasterVolume(
    value
){

    masterGain.gain.value =
    parseFloat(value);

}