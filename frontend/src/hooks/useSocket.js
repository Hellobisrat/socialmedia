import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(userId) {
  const socket = useRef(null);

  useEffect(() => {
    if (!userId) return;

    socket.current = io("http://localhost:5000", {
      query: { userId },
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [userId]);

  const on = (event, callback) => {
    socket.current?.on(event, callback);
  };

  const emit = (event, data) => {
    socket.current?.emit(event, data);
  };

  return { socket: socket.current, on, emit };
}