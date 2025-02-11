import { useEffect, useState, ReactNode, createContext } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { config } from "../config/config";

interface SocketContextProps {
  socket?: Socket;
  initiateConnection: () => void;
}

interface SocketContainerProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextProps>({
  initiateConnection: () => {},
});

export default function SocketContainer({ children }: SocketContainerProps) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  // Initialized socket connection.
  const initiateConnection = () => {
    const isAuthenticated = localStorage.getItem("auth_token");
    if (isAuthenticated) {
      const socketInitialize = socketIOClient(config.socketUrl, {
        transports: ['websocket'],
        query: { auth_token: isAuthenticated },
        autoConnect: true
      });
      setSocket(socketInitialize);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log("connect", socket.id);
      });
      socket.on('disconnect', () => {
        console.log("disconnect");
      });
    }

    // Cleanup the socket connection on unmount
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value=
      {{
        socket,
        initiateConnection
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
