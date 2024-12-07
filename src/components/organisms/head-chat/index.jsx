import Image from "next/image";
import ModalElement from "@/components/elements/modal";
import { useState } from "react";

const HeadChatOrganism = ({ chat }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex justify-between items-center bg-white px-4 py-2">
      <div className="flex items-center gap-3">
        <div>
          <Image src="/Rectangle-8.svg" alt="avatar" width={40} height={40} />
        </div>
        <div>
          <p className="font-bold text-black text-lg">Jhonson</p>
          <p className="text-slate-500 text-sm">Online</p>
        </div>
      </div>
      <div className="cursor-pointer" onClick={handleShowModal}>
        <Image src="/profile-menu.svg" alt="profile-menu" width={20} height={20} />
      </div>

      {/* modal */}
      <ModalElement className={`absolute top-11 right-3 rounded-lg p-3 pr-10 bg-blue-sky border shadow-lg z-10 ${showModal ? "block" : "hidden"}`}>
        <p>Delete Chat</p>
      </ModalElement>
    </div>
  );
};

export default HeadChatOrganism;
