// js/audio/lfo.js

import { audioContext } from "./audioEngine.js";

export function createLFO(
    target,
    settings
) {

    const lfo =
        audioContext.createOscillator();

    const lfoGain =
        audioContext.createGain();

    lfo.type =
        settings.lfoWave || "sine";

    lfo.frequency.value =
        parseFloat(settings.lfoRate || 5);

    lfoGain.gain.value =
        parseFloat(settings.lfoDepth || 0);

    lfo.connect(lfoGain);

    lfoGain.connect(target);

    lfo.start();

    return {
        lfo,
        lfoGain
    };
}