import {isFunction} from "../../../utils/helpers";

export default {
    data() {
        return {
            carSoundRef: {
                bg: '__carSoundRefBg',
                cuttime: '__carSoundRefCuttime',
                over: '__carSoundRefOver',
                staring: '__carSoundRefStaring',
            },
            hasCarAudio: false,
            carSounds: {
                bg: null,
                cuttime: null,
                over: null,
                staring: null,
            },
        }
    },
    mounted() {
        this.initCarAudio();
    },
    methods: {
        initCarAudio() {
            this.$el.addEventListener('click', () => {
                if (!this.hasCarAudio) {
                    const carSoundRef = this.carSoundRef;
                    for (let key in carSoundRef) {
                        this.carSounds[key] = this.$refs[carSoundRef[key]];
                    }
                    this.hasCarAudio = true;
                    window.carSounds = this.carSounds;
                }
            });
        },
        pauseCarSounds() {
            const carSounds = Object.values(this.carSounds);
            for (let audio of carSounds) {
                if (audio && isFunction(audio.pause)) {
                    audio.pause();
                }
            }
        }
    }
}
