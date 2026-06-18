export function getOsc3Settings() {

    return {

        wave:
            document.getElementById(
                "osc2Wave"
            ).value,

        attack:
            parseFloat(
                document.getElementById(
                    "osc3Attack"
                ).value
            ),

        decay:
            parseFloat(
                document.getElementById(
                    "osc3Decay"
                ).value
            ),

        sustain:
            parseFloat(
                document.getElementById(
                    "osc3Sustain"
                ).value
            ),

        release:
            parseFloat(
                document.getElementById(
                    "osc3Release"
                ).value
            ),

        filterType:
            document.getElementById(
                "osc3FilterType"
            ).value,

        cutoff:
            document.getElementById(
                "osc3Cutoff"
            ).value,

        q:
            document.getElementById(
                "osc3Q"
            ).value,

        lfoWave:
            document.getElementById(
                "osc3LFOWave"
            ).value,

        lfoTarget:
            document.getElementById(
                "osc3LFOTarget"
            ).value,

        lfoRate:
            document.getElementById(
                "osc3LFORate"
            ).value,

        lfoDepth:
            document.getElementById(
                "osc3LFODepth"
            ).value

    };

}