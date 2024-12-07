import HeadChatOrganism from "@/components/organisms/head-chat";
import ChatContentOrganism from "@/components/organisms/chat-content";
import ChatFormOrganism from "@/components/organisms/chat-form";

const ChatTemplate = () => {
  return (
    <div className="flex flex-col h-screen">
      <HeadChatOrganism />
      <ChatContentOrganism />
      <ChatFormOrganism />
    </div>
  );
};

export default ChatTemplate;
