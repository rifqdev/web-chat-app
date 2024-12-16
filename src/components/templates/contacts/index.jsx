"use client";
import Image from "next/image";
import InputElement from "@/components/elements/input";
import { getFriends } from "@/utils/api";
import { useEffect, useState } from "react";

const ContactsTemplate = ({ handleActiveSidebar, setSelectedChat }) => {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await getFriends(search);
      setFriends(response.data);
    };
    fetchFriends();
  }, [search]);

  return (
    <div className="bg-white col-span-3 p-5 overflow-y-auto pb-20">
      <div className="w-full flex items-center justify-between">
        <Image src="/back.svg" alt="avatar" width={10} height={10} className="cursor-pointer" onClick={() => handleActiveSidebar("chatlist")} />
        <h1 className="text-blue-sky font-semibold text-xl flex-1 text-center">Contacts</h1>
      </div>
      <div className="flex items-center mt-5 gap-3">
        <InputElement
          className="border p-2 w-full rounded-lg text-black"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-8">
        {friends.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 mt-3 cursor-pointer hover:bg-slate-100 hover:p-1 transition-all duration-300 ease-out"
            onClick={() => setSelectedChat(true)}
          >
            <Image src={item.avatar || "/Rectangle-8.svg"} alt="avatar" width={40} height={40} />
            <div>
              <h1 className="text-black font-semibold">{item.friend_fullname}</h1>
              <p className="text-slate-500">{item.friend_username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsTemplate;
