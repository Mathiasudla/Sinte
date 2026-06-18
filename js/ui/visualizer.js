import { analyser } from "../audio/audioEngine.js";

export function startVisualizer() {

    const canvas = document.getElementById("oscilloscope");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {

        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        let isSilent = true;

        for (let i = 0; i < bufferLength; i++) {
            if (Math.abs(dataArray[i] - 128) > 2) {
                isSilent = false;
                break;
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#00e5ff";

        ctx.beginPath();

        if (isSilent) {

            const y = canvas.height / 2;

            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);

        } else {

            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {

                const v = dataArray[i] / 128;
                const y = v * canvas.height / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }
        }

        ctx.stroke();
    }

    draw();
}