import Image from "next/image";
import ButtonElement from "@/components/elements/button";
import InputElement from "@/components/elements/input";
import { formatDistance } from "date-fns";
import { eoLocale } from "date-fns/locale/id";
import { getChat } from "@/utils/api";
import { useChatStore } from "@/store/store";

const ChatListTemplate = ({ handleShowModal, setSelectedChat, listFriends }) => {
  const userId = localStorage.getItem("user_id");

  const uniqueFriends = [];
  const seenFriends = new Set();

  listFriends &&
    listFriends.forEach((item) => {
      const friendId = item.friendInfo.id === userId ? item.userInfo.id : item.friendInfo.id;

      if (!seenFriends.has(friendId)) {
        seenFriends.add(friendId);
        uniqueFriends.push(item);
      }
    });

  const handleSelectChat = async (friend) => {
    const isFriendSender = userId === friend.sender;
    const selectedFriendId = isFriendSender ? friend.friendInfo.id : friend.sender;

    const friendData = {
      user_id: userId,
      friend_id: selectedFriendId,
      friend_fullname: isFriendSender ? friend.friendInfo.fullname : friend.userInfo.fullname,
      friend_photo: isFriendSender
        ? `https://minio.rifqidev.my.id/${friend.friendInfo.photo}`
        : `https://minio.rifqidev.my.id/${friend.userInfo.photo}`,
    };

    // Simpan data teman ke state
    setSelectedChat(friendData);

    // Fetch chat untuk teman yang dipilih
    const response = await getChat(friendData.friend_id);

    // Simpan chat ke state global
    useChatStore.setState({ chat: response.data });
    useChatStore.setState({ chatId: friendData.friend_id });
  };

  return (
    <div className="bg-white col-span-3 px-5">
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-blue-500 text-2xl font-semibold">Chatan</h1>
        <ButtonElement onClick={handleShowModal}>
          <Image src="/menu-icon.svg" alt="add" width={20} height={20} />
        </ButtonElement>
      </div>
      <div className="flex items-center mt-5 gap-3">
        <InputElement className="border p-2 w-full rounded-lg text-black" placeholder="Search" />
      </div>
      <div className="mt-5">
        {uniqueFriends.map((item, index) => {
          const isCurrentUserSender = item.friendInfo.id === userId;

          return (
            <div
              key={index}
              className="flex items-center mt-3 cursor-pointer hover:bg-slate-100 hover:p-1 transition-all duration-300 ease-out justify-between"
              onClick={() => handleSelectChat(item)}
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={`https://minio.rifqidev.my.id/${isCurrentUserSender ? item.userInfo.photo : item.friendInfo.photo}` || "/Rectangle-8.svg"}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h1 className="text-black font-semibold">{isCurrentUserSender ? item.userInfo.fullname : item.friendInfo.fullname}</h1>
                  <p className="text-slate-500">{item.last_message}</p>
                </div>
              </div>
              <div className="flex flex-col items-end text-sm gap-1">
                <p className="text-slate-500">{formatDistance(new Date(item.last_message_at), new Date(), { locale: eoLocale })}</p>
                {item.unread_message_count > 0 && (
                  <p className="text-white bg-blue-500 px-1 rounded-full flex items-center justify-center">{item.unread_message_count}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatListTemplate;
