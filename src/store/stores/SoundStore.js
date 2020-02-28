import {isFunction} from "../../utils/helpers";

export default {
    state: {
        kaijiangSound: null,
        fengpanSound: null,
        keyixiazhuSound: null,
    },
    getters: {
        kaijiangSound: (state) => state.kaijiangSound,
        fengpanSound: (state) => state.fengpanSound,
        keyixiazhuSound: (state) => state.keyixiazhuSound,
        hasAudioSound: (state) => {
            return state.kaijiangSound && state.fengpanSound && state.keyixiazhuSound;
        },
    },
    mutations: {
        setKaijiangSound(state, kaijiangSound) {
            state.kaijiangSound = kaijiangSound;
        },
        setFengpanSound(state, fengpanSound) {
            state.fengpanSound = fengpanSound;
        },
        setKeyixiazhuSound(state, keyixiazhuSound) {
            state.keyixiazhuSound = keyixiazhuSound;
        },

        playKaijiangSound(state) {
            if (!state.showVideo) {
                return;
            }
            const sound = state.kaijiangSound;
            if (sound && isFunction(sound.play)) {
                sound.play();
            }
        },
        playFengpanSound(state) {
            if (!state.showVideo) {
                return;
            }
            const sound = state.fengpanSound;
            if (sound && isFunction(sound.play)) {
                sound.play();
            }
        },
        playKeyixiazhuSound(state) {
            if (!state.showVideo) {
                return;
            }
            const sound = state.keyixiazhuSound;
            if (sound && isFunction(sound.play)) {
                sound.play();
            }
        },
    },

}
