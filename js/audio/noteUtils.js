// js/audio/noteUtils.js

const NOTE_INDEX = {

    C:0,
    "C#":1,
    D:2,
    "D#":3,
    E:4,
    F:5,
    "F#":6,
    G:7,
    "G#":8,
    A:9,
    "A#":10,
    B:11

};

export function noteToFrequency(
    note
){

    const match =
        note.match(
            /^([A-G]#?)(\d)$/
        );

    const pitch =
        match[1];

    const octave =
        parseInt(
            match[2]
        );

    const midi =
        NOTE_INDEX[pitch]
        +
        ((octave+1)*12);

    return 440 *
    Math.pow(
        2,
        (midi-69)/12
    );
}