// js/ui/octaveManager.js

let currentOctave = 4;

export function getCurrentOctave() {
    return currentOctave;
}

export function setCurrentOctave(value) {

    currentOctave = Math.max(
        1,
        Math.min(7, value)
    );

    const display =
        document.getElementById(
            "octaveDisplay"
        );

    if(display){
        display.textContent =
            `OCT ${currentOctave}`;
    }

    const master =
        document.getElementById(
            "masterOctave"
        );

    if(master){
        master.textContent =
            currentOctave;
    }
}

export function increaseOctave() {
    setCurrentOctave(
        currentOctave + 1
    );
}

export function decreaseOctave() {
    setCurrentOctave(
        currentOctave - 1
    );
}