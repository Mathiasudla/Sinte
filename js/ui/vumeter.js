// js/ui/vumeter.js

import {
    analyser
}
from "../audio/audioEngine.js";

export function startVUMeter(){

    const meter =
    document.getElementById(
        "vuFill"
    );

    if(!meter) return;

    const data =
    new Uint8Array(
        analyser.frequencyBinCount
    );

    function update(){

        requestAnimationFrame(
            update
        );

        analyser.getByteFrequencyData(
            data
        );

        let sum = 0;

        for(
            let i=0;
            i<data.length;
            i++
        ){

            sum += data[i];

        }

        const avg =
        sum / data.length;

        meter.style.width =
        `${avg}%`;

    }

    update();

}