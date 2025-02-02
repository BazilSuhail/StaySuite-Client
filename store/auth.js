/*import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isInitialized = ref(false); // Track initialization state

  // State variables
  const user = ref(null);
  const userRole = ref(null);
  const loading = ref(true);
  const socket = ref(null);
  const notifications = ref([]);
  const userNotifications = ref([]);
  const notificationsCount = ref(0);
  const toast = ref({ message: '', visible: false });
  const searchFilters = ref({});

  // Refs for timeout handling
  const toastTimeoutRef = ref(null);

  // Fetch and validate token
  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  };

  // Fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      user.value = response.data;
      userRole.value = response.data.role;
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    } finally {
      loading.value = false;
    }
  };

  // Fetch notifications
  const fetchUserNotifications = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/notifications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      userNotifications.value = response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Connect socket
  const connectSocket = (token) => {
    if (socket.value) {
      socket.value.disconnect();
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;

    socket.value = io(import.meta.env.VITE_REACT_APP_API_BASE_URL, {
      auth: { token, userId },
    });

    socket.value.on('connect', () => {
      console.log(`Connected to server with socket ID: ${socket.value.id}`);
    });

    socket.value.on('notification', (data) => {
      notifications.value.push(data);
      showToast(data.message);
      notificationsCount.value += 1;
      //console.log(notificationsCount.value);
    });

    socket.value.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  };

  // Login function
  const login = async (token) => {
    if (import.meta.client) {
      localStorage.setItem('token', token);
      await fetchUserData(token);
      connectSocket(token);
    }
  };

  // Logout function
  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem('token');
    }
    user.value = null;
    userRole.value = null;
    notifications.value = [];
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  // Toast functions
  const showToast = (message) => {
    toast.value = { message, visible: true };
    if (toastTimeoutRef.value) {
      clearTimeout(toastTimeoutRef.value);
    }
    toastTimeoutRef.value = setTimeout(() => {
      toast.value = { message: '', visible: false };
    }, 6000);
  };

  const closeToast = () => {
    if (toastTimeoutRef.value) {
      clearTimeout(toastTimeoutRef.value);
    }
    toast.value = { message: '', visible: false };
  };

  // Initialize logic for token validation on page load
  const initialize = () => {
    if (!import.meta.client) return; // Prevent execution on the server
    //if (isInitialized.value) return; // Avoid re-initialization
    //isInitialized.value = true;
    //console.log("Sdd")
    const token = localStorage.getItem('token');
    if (token) {
      const isValid = validateToken(token);
      if (isValid) {
        fetchUserData(token);
        fetchUserNotifications(token);
        connectSocket(token);
      } 
      else {
        logout();
      }
    } 
    else {
      loading.value = false;
    }
  };

  return {
    isInitialized,
    initialize,
    user,
    userRole,
    loading,
    socket,
    userNotifications,
    notifications,
    notificationsCount,
    toast,
    searchFilters,
    login,
    logout,
    showToast,
    closeToast,
    setSearchFilters: (filters) => (searchFilters.value = filters),
  };
});
*/

import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isInitialized = ref(false); // Track initialization state

  // State variables
  const user = ref(null);
  const userRole = ref(null);
  const loading = ref(true);
  const socket = ref(null);
  const notifications = ref([]);
  const userNotifications = ref([]);
  const notificationsCount = ref(0);
  const toast = ref({ message: '', visible: false });
  const searchFilters = ref({});

  // Refs for timeout handling
  const toastTimeoutRef = ref(null);

  // Fetch and validate token
  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  };

  // Fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/user-info`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      user.value = response.data;
      userRole.value = response.data.role;
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    } finally {
      loading.value = false;
    }
  };

  // Fetch notifications
  const fetchUserNotifications = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/air-bnb/profile/notifications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      userNotifications.value = response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Connect socket
  const connectSocket = (token) => {
    if (socket.value) {
      socket.value.disconnect();
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;

    socket.value = io(import.meta.env.VITE_REACT_APP_API_BASE_URL, {
      auth: { token, userId },
    });

    socket.value.on('connect', () => {
      console.log(`Connected to server with socket ID: ${socket.value.id}`);
    });

    socket.value.on('notification', (data) => {
      notifications.value.push(data);
      showToast(data.message);
      notificationsCount.value += 1;
    });

    socket.value.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  };

  // Login function
  const login = async (token) => {
    if (import.meta.client) {
      localStorage.setItem('token', token);
      await fetchUserData(token);
      connectSocket(token);
    }
  };

  // Logout function
  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem('token');
    }
    user.value = null;
    userRole.value = null;
    notifications.value = [];
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  // Toast functions
  const showToast = (message) => {
    toast.value = { message, visible: true };
    if (toastTimeoutRef.value) {
      clearTimeout(toastTimeoutRef.value);
    }
    toastTimeoutRef.value = setTimeout(() => {
      toast.value = { message: '', visible: false };
    }, 6000);
  };

  const closeToast = () => {
    if (toastTimeoutRef.value) {
      clearTimeout(toastTimeoutRef.value);
    }
    toast.value = { message: '', visible: false };
  };

  // Initialize logic for token validation on page load
  const initialize = async () => {
    if (!import.meta.client) return; // Prevent execution on the server
    if (isInitialized.value) return; // Avoid re-initialization
    isInitialized.value = true;

    const token = localStorage.getItem('token');
    if (token) {
      const isValid = validateToken(token);
      if (isValid) {
        await fetchUserData(token);
        await fetchUserNotifications(token);
        connectSocket(token);
      } else {
        logout();
      }
    } else {
      loading.value = false;
    }
  };

  return {
    isInitialized,
    initialize,
    user,
    userRole,
    loading,
    socket,
    userNotifications,
    notifications,
    notificationsCount,
    toast,
    searchFilters,
    login,
    logout,
    showToast,
    closeToast,
    setSearchFilters: (filters) => (searchFilters.value = filters),
  };
});