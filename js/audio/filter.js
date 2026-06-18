// js/audio/filter.js

import { audioContext } from "./audioEngine.js";

export function createFilter(settings) {

    const filter =
        audioContext.createBiquadFilter();

    filter.type =
        settings.filterType || "lowpass";

    filter.frequency.value =
        parseFloat(settings.cutoff || 20000);

    filter.Q.value =
        parseFloat(settings.q || 1);

    return filter;
}