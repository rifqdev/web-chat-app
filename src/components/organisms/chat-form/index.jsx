import Image from "next/image";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Pastikan URL mengarah ke backend yang benar
const socket = io("http://localhost:3001");

const ChatFormOrganism = ({ friend, sendMessage, setSendMessage }) => {
  const [textareaValue, setTextareaValue] = useState("");

  const adjustTextareaHeight = (element) => {
    element.style.height = "48px"; // Reset height
    element.style.height = element.scrollHeight + "px";
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on(`message_${friend.user_id}`, (message) => {
      console.log("New message:", message);
    });

    // Bersihkan listener saat komponen unmount
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off(`message_${friend.user_id}`);
    };
  }, []);

  const handleSendMessage = () => {
    if (textareaValue.trim() !== "") {
      const messageData = {
        id: socket.id,
        text: textareaValue,
        timestamp: new Date(),
        to: friend.friend_id,
        sender: friend.user_id,
      };
      socket.emit("send_message", messageData);
      setSendMessage(messageData);
      setTextareaValue("");
    }
  };

  return (
    <div className="bg-white py-4 flex justify-center relative">
      <textarea
        placeholder="Type a message"
        className="w-11/12 p-2 rounded-lg focus:outline-none bg-gray-100 text-black pr-32 overflow-y-auto resize-none max-h-36 min-h-12"
        value={textareaValue}
        onChange={handleTextareaChange}
      />
      <div className="absolute right-[130px] top-[26px]">
        <Image src="/plus-icon.svg" alt="plus-icon" width={20} height={20} />
      </div>
      <div className="absolute right-[98px] top-[26px]">
        <Image src="/emoji.svg" alt="emoji-icon" width={20} height={20} />
      </div>
      <div className="absolute right-[65px] top-[26px]" onClick={handleSendMessage}>
        <Image src="/send.svg" alt="send.svg" width={20} height={20} />
      </div>
    </div>
  );
};

export default ChatFormOrganism;
