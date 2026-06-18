export function getOsc2Settings() {

    return {

        wave:
            document.getElementById(
                "osc2Wave"
            ).value,

        attack:
            parseFloat(
                document.getElementById(
                    "osc2Attack"
                ).value
            ),

        decay:
            parseFloat(
                document.getElementById(
                    "osc2Decay"
                ).value
            ),

        sustain:
            parseFloat(
                document.getElementById(
                    "osc2Sustain"
                ).value
            ),

        release:
            parseFloat(
                document.getElementById(
                    "osc2Release"
                ).value
            ),

        filterType:
            document.getElementById(
                "osc2FilterType"
            ).value,

        cutoff:
            document.getElementById(
                "osc2Cutoff"
            ).value,

        q:
            document.getElementById(
                "osc2Q"
            ).value,

        lfoWave:
            document.getElementById(
                "osc2LFOWave"
            ).value,

        lfoTarget:
            document.getElementById(
                "osc2LFOTarget"
            ).value,

        lfoRate:
            document.getElementById(
                "osc2LFORate"
            ).value,

        lfoDepth:
            document.getElementById(
                "osc2LFODepth"
            ).value

    };

}