// js/audio/adsr.js

export function applyADSR(
    gainNode,
    attack,
    decay,
    sustain
) {

    const now =
        gainNode.context.currentTime;

    gainNode.gain.cancelScheduledValues(now);

    gainNode.gain.setValueAtTime(
        0,
        now
    );

    gainNode.gain.linearRampToValueAtTime(
        1,
        now + attack
    );

    gainNode.gain.linearRampToValueAtTime(
        sustain,
        now + attack + decay
    );
}

export function releaseADSR(
    gainNode,
    release
) {

    const now =
        gainNode.context.currentTime;

    gainNode.gain.cancelScheduledValues(now);

    gainNode.gain.setValueAtTime(
        gainNode.gain.value,
        now
    );

    gainNode.gain.linearRampToValueAtTime(
        0,
        now + release
    );
}