import HeadChatOrganism from "@/components/organisms/head-chat";
import ChatContentOrganism from "@/components/organisms/chat-content";
import ChatFormOrganism from "@/components/organisms/chat-form";

const ChatTemplate = ({ friend }) => {
  return (
    <div className="flex flex-col h-screen">
      <HeadChatOrganism friend={friend} />
      <ChatContentOrganism />
      <ChatFormOrganism friend={friend} />
    </div>
  );
};

export default ChatTemplate;
