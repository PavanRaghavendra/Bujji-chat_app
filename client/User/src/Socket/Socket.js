import { io } from "socket.io-client";
import SERVER_API from "../lib/consfig"; // Fixed typo

const socket = io(SERVER_API, {
    withCredentials: true,
    autoConnect: false, // Prevent auto-connect until explicitly needed
});

export default socket;
