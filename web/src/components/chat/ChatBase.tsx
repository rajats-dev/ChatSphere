"use client";
import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";
import { getSocket } from "@/socket.config";
import ChatSidebar from "./ChatSidebar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";

function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);
  // let socket = useMemo(() => {
  //   const socket = getSocket();
  //   socket.auth = {
  //     room: groupId,
  //   };
  //   return socket.connect();
  // }, []);

  // useEffect(() => {
  //   socket.on("message", (data) => {
  //     console.log("The Socket message is", data);
  //   });

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  // const handleClick = () => {
  //   socket.emit("message", { name: "rajat", id: uuidV4() });
  // };

  return (
    <div className="flex">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}

        {/* Messages */}
        {/* <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} /> */}
      </div>
    </div>
  );
}

export default ChatBase;
