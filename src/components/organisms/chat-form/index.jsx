import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useChatStore } from "@/store/store";

// Pastikan URL mengarah ke backend yang benar
const socket = io("http://localhost:3001");

const defaultSound = "/notification/software-interface-start.wav";

const ChatFormOrganism = ({ friend }) => {
  const [textareaValue, setTextareaValue] = useState("");

  const soundSrc = localStorage.getItem("sound") || defaultSound;

  const chat = useChatStore((state) => state.chat);
  const adjustTextareaHeight = (element) => {
    element.style.height = "48px"; // Reset height
    element.style.height = element.scrollHeight + "px";
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on(`message_${friend.user_id}`, (message) => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }

      if (audioRef.current && soundSrc) {
        audioRef.current.src = soundSrc;
        audioRef.current.play().catch((error) => console.error("Audio playback failed:", error));
      }
      useChatStore.setState((state) => ({ chat: [...state.chat, message] }));
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
        message: textareaValue,
        createdAt: new Date(),
        to: friend.friend_id,
        sender: friend.user_id,
      };
      socket.emit("send_message", messageData);
      useChatStore.setState({ chat: [...chat, messageData] });
      setTextareaValue("");
    }
  };

  return (
    <div ref={chatContainerRef} className="bg-white py-4 flex justify-center relative">
      <audio ref={audioRef} />
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
