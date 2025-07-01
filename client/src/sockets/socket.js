// src/socket.js
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL;

export const socket = io(URL, {
  withCredentials: true,
  autoConnect: false, // We'll connect manually after login
});
