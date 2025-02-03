"use client";

import React, { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";
import { getSocket } from "@/socket.config";

const ChatBase = () => {
  let socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("The Socket message is", data);
    });
    return () => {
      socket.close();
    };
  }, []);

  const handleClick = () => {
    socket.emit("message", { name: "rajat", id: uuidV4() });
  };

  return (
    <div>
      <Button onClick={handleClick}>Send Message</Button>
    </div>
  );
};

export default ChatBase;
