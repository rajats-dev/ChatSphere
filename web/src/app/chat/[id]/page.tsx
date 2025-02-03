import ChatBase from "@/components/chat/ChatBase";
import { getSocket } from "@/socket.config";
import React, { useMemo } from "react";

export default function chat({ params }: { params: { id: string } }) {
  return (
    <>
      <ChatBase />
    </>
  );
}
