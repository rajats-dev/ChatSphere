import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatFetch";
import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { getSocket } from "@/lib/socket.config";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";

export default async function chat({ params }: { params: { id: string } }) {
  if (params.id.length !== 36) {
    return notFound();
  }
  const chatGroup: GroupChatType | null = await fetchChatGroup(params.id);
  if (chatGroup === null) {
    return notFound();
  }
  const chatGroupUsers: Array<GroupChatUserType> | [] =
    await fetchChatGroupUsers(params?.id);

  // console.log("1:", chatGroup);
  // console.log("2:", chatGroupUsers);

  const chats: Array<MessageType> | [] = await fetchChats(params.id);

  return (
    <>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </>
  );
}
