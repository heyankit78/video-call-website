import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the Socket.IO client
    const connection = io(process.env.NEXT_PUBLIC_SOCKET_SERVER || "", {
      path: "/api/socket", // Match the server's custom path
    });

    // Set the socket instance
    setSocket(connection);

    // Log connection events
    connection.on("connect", () => {
      console.log("Connected to the server:", connection);
    });

    connection.on("connect_error", async (err) => {
      console.error("Socket connection error:", err);

      // Attempt to reinitialize the socket connection
      await fetch("/api/socket"); // Ensure the server is running
      connection.connect(); // Retry the connection
    });

    // Cleanup on unmount
    return () => {
      connection.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
