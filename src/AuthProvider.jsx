/*import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const isValid = validateToken(token);
      if (isValid) {
        fetchUserData(token);
        connectSocket(token); // Connect if the token is valid
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setUserRole(null);
      }
    }
    setLoading(false);

    // Disconnect on browser close
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setUser(null);
      setUserRole(null);
    }
  };

  const connectSocket = (token) => {
    if (!socket) {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      const userId = payload._id;
      //console.log(token);
      const newSocket = io(import.meta.env.VITE_REACT_APP_API_BASE_URL_SOCKET, {
        auth: { token, userId }, 
      });

      newSocket.on("connect", () => {
        console.log(`Connected to server with socket ID: ${newSocket.id}`);
      });

      newSocket.on("notification", (data) => {
        console.log(`Notification for user ${userId}:`, data);
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      setSocket(newSocket);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData(token);
    connectSocket(token); // Connect the user to the server
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
    if (socket) {
      socket.disconnect(); // Disconnect the user from the server
      setSocket(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, logout, socket }}>
      {children}
    </AuthContext.Provider>
  );
};
*/
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchfilters, setSearchFilters] = useState({});
  const [userNotifications, setUserNotifications] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const isValid = validateToken(token);
      if (isValid) {
        fetchUserData(token);
        fetchUserNotifications(token);
        connectSocket(token);
      } else {
        handleLogout();
      }
    } else {
      setLoading(false);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };
  const fetchUserNotifications = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/notifications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserNotifications(response.data);
      //console.log(response.data) 
    } 
    catch (error) {
      console.error("Error fetching user data:", error); 
    }  
  };

  const connectSocket = (token) => {
    if (socket) {
      socket.disconnect();
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    const newSocket = io(import.meta.env.VITE_REACT_APP_API_BASE_URL, {
      auth: { token, userId },
    });

    newSocket.on("connect", () => {
      console.log(`Connected to server with socket ID: ${newSocket.id}`);
    });

    newSocket.on("notification", (data) => {
      console.log(`Notification received:`, data);
      setNotifications((prev) => [...prev, data]);
      //setNotificationsCount(notificationsCount + 1);
      setNotificationsCount((prev) => prev + 1);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData(token);
    connectSocket(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
    setNotifications([]);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const logout = () => {
    handleLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        login,
        logout,
        socket,
        notifications,
        notificationsCount,
        userNotifications,
        setSearchFilters,
        searchfilters,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const isValid = validateToken(token);
      if (isValid) {
        fetchUserData(token);
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setUserRole(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
      setUser(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
*/