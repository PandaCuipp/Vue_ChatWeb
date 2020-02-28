import {isFunction} from "../../../utils/helpers";

export default {
    data() {
        return {
            fiveSoundRef: {
                bg: '__fiveSoundRefBg',
                run: '__fiveSoundRefRun',
            },
            hasFiveAudio: false,
            fiveSounds: {
                bg: null,
                run: null,
            },
        }
    },
    mounted() {
        this.initFiveAudio();
    },
    methods: {
        initFiveAudio() {
            this.$el.addEventListener('click', () => {
                if (!this.hasFiveAudio) {
                    const fiveSoundRef = this.fiveSoundRef;
                    for (let key in fiveSoundRef) {
                        this.fiveSounds[key] = this.$refs[fiveSoundRef[key]];
                    }
                    this.hasFiveAudio = true;
                    window.fiveSounds = this.fiveSounds;
                }
            });
        },
        pauseFiveSounds() {
            const fiveSounds = Object.values(this.fiveSounds);
            for (let audio of fiveSounds) {
                if (audio && isFunction(audio.pause)) {
                    audio.pause();
                }
            }
        }
    }
}
