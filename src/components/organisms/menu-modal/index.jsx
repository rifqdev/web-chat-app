import ModalElement from "@/components/elements/modal";
import Image from "next/image";

const MenuModalOrganism = ({ handleActiveSidebar, showModal, handleShowModal, showAddFriendModal, handleShowAddFriendModal }) => {
  return (
    <ModalElement className="absolute top-12 left-12 rounded-lg p-5 w-1/5 bg-blue-sky z-10">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          handleActiveSidebar("setting");
          handleShowModal(!showModal);
        }}
      >
        <Image src="/settings.svg" alt="setting" width={20} height={20} />
        <p className="text-white text-lg font-light">Setting</p>
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer mt-5"
        onClick={() => {
          handleActiveSidebar("contacts");
          handleShowModal(!showModal);
        }}
      >
        <Image src="/contacts.svg" alt="setting" width={20} height={20} />
        <p className="text-white text-lg font-light">Contacts</p>
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer mt-5"
        onClick={() => {
          handleShowAddFriendModal(!showAddFriendModal);
          handleShowModal(!showModal);
        }}
      >
        <Image src="/Invite-friends.svg" alt="setting" width={20} height={20} />
        <p className="text-white text-lg font-light">Invite friends</p>
      </div>
    </ModalElement>
  );
};

export default MenuModalOrganism;
