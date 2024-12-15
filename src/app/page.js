"use client";
import { useState } from "react";
import MenuModalOrganism from "@/components/organisms/menu-modal";
import AddFriendModalOrganism from "@/components/organisms/add-friend-modal";
import ChatListTemplate from "@/components/templates/chatlist";
import SettingsTemplate from "@/components/templates/settings";
import ContactsTemplate from "@/components/templates/contacts";
import ChatTemplate from "@/components/templates/chat";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("chatlist");
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleActiveSidebar = (sidebar) => {
    setActiveSidebar(sidebar);
  };

  const handleShowAddFriendModal = () => {
    setShowAddFriendModal(!showAddFriendModal);
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* <SplashScreen /> */}
      {activeSidebar === "chatlist" && <ChatListTemplate handleShowModal={handleShowModal} setSelectedChat={setSelectedChat} />}
      {activeSidebar === "setting" && <SettingsTemplate handleActiveSidebar={handleActiveSidebar} />}
      {activeSidebar === "contacts" && <ContactsTemplate handleActiveSidebar={handleActiveSidebar} setSelectedChat={setSelectedChat} />}
      <div className="col-span-9">
        {selectedChat ? (
          <ChatTemplate />
        ) : (
          <div className="h-full flex justify-center items-center">
            <h1 className="text-slate-500 text-lg">Please select a chat to start messaging</h1>
          </div>
        )}
      </div>
      {/* modal */}
      {showModal && (
        <MenuModalOrganism
          handleActiveSidebar={handleActiveSidebar}
          showModal={showModal}
          handleShowModal={handleShowModal}
          showAddFriendModal={showAddFriendModal}
          handleShowAddFriendModal={handleShowAddFriendModal}
        />
      )}
      {/* modal add friend */}
      {showAddFriendModal && <AddFriendModalOrganism showModal={showAddFriendModal} handleShowModal={handleShowAddFriendModal} />}
    </div>
  );
}
