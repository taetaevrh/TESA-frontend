import { useEffect } from "react";
import { io } from "socket.io-client";

export const useMQTTListener = (onMessage) => {
  useEffect(() => {
    const socket = io("http://localhost:9999");

    socket.on("mqtt_message", (data) => {
      onMessage(data);
    });

    return () => socket.disconnect();
  }, [onMessage]);
};
