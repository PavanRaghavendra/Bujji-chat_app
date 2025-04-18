import { createContext, useContext, useEffect } from "react";
import socket from "./Socket";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children }) => {
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
