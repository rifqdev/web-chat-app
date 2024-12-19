"use client";
import ModalElement from "@/components/elements/modal";
import Image from "next/image";
import InputElement from "@/components/elements/input";
import { addFriend, getByPin } from "@/utils/api";
import { useState, useEffect } from "react";

const AddFriendModalOrganism = ({ showModal, handleShowModal }) => {
  const [pin, setPin] = useState("");
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const fetchByPin = async () => {
      const response = await getByPin(pin);
      setFriend(response.data);
    };
    fetchByPin();
  }, [pin]);

  const handleAddFriend = async (pin) => {
    const response = await addFriend({ pin });
    alert(response.message);
    handleShowModal(!showModal);
  };
  return (
    <ModalElement className="absolute top-1/2 left-1/2 rounded-lg p-5 w-1/5 bg-white border shadow-lg z-10">
      <h1 className="text-lg text-blue-sky text-center font-semibold">Add Friend</h1>
      <InputElement
        className="border p-2 w-full rounded-lg text-black"
        placeholder="Enter PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      {friend ? (
        <div
          key={friend.id}
          className="flex items-center gap-3 mt-3 cursor-pointer hover:bg-slate-100 hover:bg-opacity-50 transition-all duration-300 ease-out"
          onClick={() => handleAddFriend(friend.pin)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image src={friend.photo || "/Rectangle-8.svg"} alt="avatar" width={40} height={40} />
          </div>
          <div>
            <h1 className="text-black font-semibold">{friend.fullname}</h1>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500 mt-5 animate-pulse">No Friend Found</p>
      )}
      <div className="relative" onClick={() => handleShowModal(!showModal)}>
        <p className="absolute -top-40 left-56 font-bold text-red-500 cursor-pointer bg-white px-1 border rounded-full">X</p>
      </div>
    </ModalElement>
  );
};

export default AddFriendModalOrganism;
