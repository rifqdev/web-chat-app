import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "@/store/store";
import { formatDistance } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { markAsRead } from "@/utils/api";

const ChatContentOrganism = () => {
  const userId = localStorage.getItem("user_id");
  const chat = useChatStore((state) => state.chat);
  const [chatIds, setChatIds] = useState([]);
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [soundSrc, setSoundSrc] = useState("");

  useEffect(() => {
    const markAsReadChat = chat.filter((message) => message.is_read === false);
    setChatIds(markAsReadChat.map((message) => message.id));
  }, [chat]);

  useEffect(() => {
    const sound = localStorage.getItem("sound") || "/notification/software-interface-start.wav";
    setSoundSrc(sound);
  }, []);

  useEffect(() => {
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
  }, [chat, soundSrc]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: chatContainerRef.current,
        threshold: 0.1,
      }
    );

    const target = document.getElementById("target-chat");
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      markAsRead({ ids: chatIds });
    }
  }, [isVisible]);

  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-2">
      <audio ref={audioRef} />
      {chat.length > 0 ? (
        chat.map((message, index) => (
          <div key={index} className={`flex ${userId === message.sender ? "justify-end" : "justify-start"} mt-3`}>
            <div>
              <p
                className={`${
                  userId === message.sender ? "bg-blue-sky text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"
                } rounded-lg px-4 py-2 w-fit`}
              >
                {message.message}
              </p>
              <div className={`flex ${userId === message.sender ? "justify-end" : "justify-start"}`}>
                <p className="text-slate-400 text-xs">{formatDistance(new Date(message.createdAt), new Date(), { locale: localeId })}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-5">No messages yet</p>
      )}
      <div id="target-chat" />
    </div>
  );
};

export default ChatContentOrganism;
