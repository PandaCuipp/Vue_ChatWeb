import GameStore from "./stores/GameStore";
import UserStore from "./stores/UserStore";
import ChatStore from "./stores/ChatStore";
import WebSocketStore from "./stores/WebSocketStore";
import LiuHeStore from "./stores/LiuHeStore";

export default {
    ...UserStore.state,
    ...GameStore.state,
    ...ChatStore.state,
    ...WebSocketStore.state,
    ...LiuHeStore.state,
}
