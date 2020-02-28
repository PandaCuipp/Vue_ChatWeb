import UserStore from "./stores/UserStore";
import GameStore from "./stores/GameStore";
import ChatStore from "./stores/ChatStore";
import WebSocketStore from "./stores/WebSocketStore";
import SoundStore from "./stores/SoundStore";
import LiuHeStore from "./stores/LiuHeStore";


export default {
    ...UserStore.mutations,
    ...GameStore.mutations,
    ...ChatStore.mutations,
    ...WebSocketStore.mutations,
    ...SoundStore.mutations,
    ...LiuHeStore.mutations,
}
