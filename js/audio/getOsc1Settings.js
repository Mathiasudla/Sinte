export function getOsc1Settings() {

    return {

        wave:
            document.getElementById(
                "osc1Wave"
            ).value,

        attack:
            parseFloat(
                document.getElementById(
                    "osc1Attack"
                ).value
            ),

        decay:
            parseFloat(
                document.getElementById(
                    "osc1Decay"
                ).value
            ),

        sustain:
            parseFloat(
                document.getElementById(
                    "osc1Sustain"
                ).value
            ),

        release:
            parseFloat(
                document.getElementById(
                    "osc1Release"
                ).value
            ),

        filterType:
            document.getElementById(
                "osc1FilterType"
            ).value,

        cutoff:
            document.getElementById(
                "osc1Cutoff"
            ).value,

        q:
            document.getElementById(
                "osc1Q"
            ).value,

        lfoWave:
            document.getElementById(
                "osc1LFOWave"
            ).value,

        lfoTarget:
            document.getElementById(
                "osc1LFOTarget"
            ).value,

        lfoRate:
            document.getElementById(
                "osc1LFORate"
            ).value,

        lfoDepth:
            document.getElementById(
                "osc1LFODepth"
            ).value

    };

}