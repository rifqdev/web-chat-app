import Image from "next/image";
import ButtonElement from "@/components/elements/button";
import InputElement from "@/components/elements/input";

const mockData = [
  {
    id: 1,
    fullname: "John Doe",
    lastMessage: "Hello, how are you?",
    createdAt: "12:00 PM",
    avatar: "/Rectangle-8.svg",
    unread: 1,
  },
  {
    id: 2,
    fullname: "John Doe",
    lastMessage: "Hello, how are you?",
    createdAt: "12:00 PM",
    avatar: "/Rectangle-8.svg",
    unread: 0,
  },
  {
    id: 3,
    fullname: "John Doe",
    lastMessage: "Hello, how are you?",
    createdAt: "12:00 PM",
    avatar: "/Rectangle-8.svg",
    unread: 20,
  },
];

const ChatListTemplate = ({ handleShowModal, setSelectedChat }) => {
  const handleSelectChat = (chat) => {
    setSelectedChat(true);
  };
  return (
    <div className="bg-white col-span-3 px-5">
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-blue-500 text-2xl font-semibold ">Chatan</h1>
        <ButtonElement onClick={handleShowModal}>
          <Image src="/menu-icon.svg" alt="add" width={20} height={20} />
        </ButtonElement>
      </div>
      <div className="flex items-center mt-5 gap-3">
        <InputElement className="border p-2 w-full rounded-lg text-black" placeholder="Search" />
      </div>
      <div className="mt-5">
        {mockData.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 mt-3 cursor-pointer hover:bg-slate-100 hover:p-1 transition-all duration-300 ease-out"
            onClick={() => handleSelectChat(item)}
          >
            <Image src={item.avatar} alt="avatar" width={40} height={40} />
            <div>
              <h1 className="text-black font-semibold">{item.fullname}</h1>
              <p className="text-slate-500">{item.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end text-sm gap-1">
              <p className="text-slate-500">{item.createdAt}</p>
              {item.unread > 0 && <p className="text-white bg-blue-500 px-1 rounded-full flex items-center justify-center ">{item.unread}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatListTemplate;
