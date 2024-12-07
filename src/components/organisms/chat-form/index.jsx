import Image from "next/image";
import { useState } from "react";

const ChatFormOrganism = () => {
  const [textareaValue, setTextareaValue] = useState("");

  const adjustTextareaHeight = (element) => {
    element.style.height = "48px"; // Reset height
    element.style.height = element.scrollHeight + "px";
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    adjustTextareaHeight(e.target);
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
      <div className="absolute right-[65px] top-[26px]">
        <Image src="/camera.svg" alt="camera.svg" width={20} height={20} />
      </div>
    </div>
  );
};

export default ChatFormOrganism;
