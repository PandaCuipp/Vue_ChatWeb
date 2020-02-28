import UserStore from "./stores/UserStore";
import GameStore from "./stores/GameStore";
import ChatStore from "./stores/ChatStore";
import WebSocketStore from "./stores/WebSocketStore";
import LiuHeStore from "./stores/LiuHeStore";


export default {
    ...UserStore.actions,
    ...GameStore.actions,
    ...ChatStore.actions,
    ...WebSocketStore.actions,
    ...LiuHeStore.actions,

}
