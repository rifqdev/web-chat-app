import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/store";
import { formatDistance } from "date-fns";
import { eoLocale } from "date-fns/locale/id";

const ChatContentOrganism = () => {
  const userId = localStorage.getItem("user_id");
  const chat = useChatStore((state) => state.chat);

  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    // Mengambil sumber suara dari localStorage
    const soundSrc = localStorage.getItem("sound") || "/notification/software-interface-start.wav";

    if (audioRef.current && soundSrc) {
      audioRef.current.src = soundSrc; // Mengatur sumber audio
      audioRef.current.play(); // Memutar audio
    }
  }, [chat]);

  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-2">
      <audio ref={audioRef} />
      {chat.length > 0 ? (
        chat.map((message, index) => {
          if (userId === message.sender) {
            return (
              <div key={index} className="flex justify-end mt-3">
                <div>
                  <p className="bg-blue-sky block ml-auto text-white rounded-lg px-4 py-2 w-fit rounded-br-none rounded-tr-3xl">{message.message}</p>
                  <div className="flex justify-end">
                    <p className="text-slate-400 text-xs">{formatDistance(new Date(message.createdAt), new Date(), { locale: eoLocale })}</p>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex justify-start mt-3">
                <div>
                  <p className="bg-gray-200 text-black rounded-lg px-4 py-2 w-fit rounded-bl-none rounded-tl-3xl">{message.message}</p>
                  <div className="flex justify-start">
                    <p className="text-slate-400 text-xs">{formatDistance(new Date(message.createdAt), new Date(), { locale: eoLocale })}</p>
                  </div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <p className="text-gray-500 text-center mt-5">No messages yet</p>
      )}
    </div>
  );
};

export default ChatContentOrganism;
