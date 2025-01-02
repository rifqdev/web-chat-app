import React, { useEffect, useRef, useState, useMemo } from "react";
import { useChatStore } from "@/store/store";
import { formatDistance } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { markAsRead } from "@/utils/api";

const ChatContentOrganism = () => {
  const userId = localStorage.getItem("user_id");
  const chat = useChatStore((state) => state.chat);
  const friendId = useChatStore((state) => state.chatId);

  const [chatIds, setChatIds] = useState([]);
  const chatContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Filter chat yang relevan
  const filteredChat = useMemo(
    () =>
      chat.filter(
        (message) => message.sender === userId || message.receiver === friendId || message.sender === friendId || message.receiver === userId
      ),
    [chat, userId, friendId]
  );

  // Menandai pesan yang belum terbaca
  useEffect(() => {
    const markAsReadChat = filteredChat.filter((message) => !message.is_read);
    setChatIds(markAsReadChat.map((message) => message.id));
  }, [filteredChat]);

  // Scroll ke bawah secara otomatis ketika ada pesan baru
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [filteredChat]);

  // Menggunakan IntersectionObserver untuk memeriksa apakah target terlihat
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

  // Tandai pesan sebagai sudah dibaca ketika terlihat
  useEffect(() => {
    if (isVisible && chatIds.length > 0) {
      markAsRead({ ids: chatIds });
    }
  }, [isVisible, chatIds]);

  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-2">
      {filteredChat.length > 0 ? (
        filteredChat.map((message, index) => (
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
