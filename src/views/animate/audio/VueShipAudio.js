import {isFunction} from "../../../utils/helpers";

export default {
    data() {
        return {
            shipSoundRef: {
                bg: '__shipSoundRefBg',
                kaisound: '__shipSoundRefKaisound',
                running: '__shipSoundRefRunning',
            },
            hasShipAudio: false,
            shipSounds: {
                bg: null,
                kaisound: null,
                running: null,
            },
        }
    },
    mounted() {
        this.initShipAudio();
    },
    methods: {
        initShipAudio() {
            this.$el.addEventListener('click', () => {
                if (!this.hasShipAudio) {
                    const shipSoundRef = this.shipSoundRef;
                    for (let key in shipSoundRef) {
                        this.shipSounds[key] = this.$refs[shipSoundRef[key]];
                    }
                    this.hasShipAudio = true;
                    window.shipSounds = this.shipSounds;
                }
            });
        },
        pauseShipSounds() {
            const shipSounds = Object.values(this.shipSounds);
            for (let audio of shipSounds) {
                if (audio && isFunction(audio.pause)) {
                    audio.pause();
                }
            }
        }
    }
}
