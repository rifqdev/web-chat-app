import HeadChatOrganism from "@/components/organisms/head-chat";
import ChatContentOrganism from "@/components/organisms/chat-content";
import ChatFormOrganism from "@/components/organisms/chat-form";
import { useState } from "react";

const ChatTemplate = ({ friend }) => {
  const [sendMessage, setSendMessage] = useState("");

  console.log(sendMessage);
  return (
    <div className="flex flex-col h-screen">
      <HeadChatOrganism friend={friend} />
      <ChatContentOrganism />
      <ChatFormOrganism friend={friend} sendMessage={sendMessage} setSendMessage={setSendMessage} />
    </div>
  );
};

export default ChatTemplate;
