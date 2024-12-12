import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      //const userId = payload._id;
      const userId = payload.id;

      const newSocket = io(import.meta.env.VITE_REACT_APP_API_BASE_URL, {
        auth: { userId, token },
      });

      newSocket.on("connect", () => {
        console.log("Connected to server");
        console.log(newSocket.id);
      });

      newSocket.on("notification", (data) => {
        console.log("Notification received:", data);
        setNotifications((prev) => [...prev, data]);
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};
