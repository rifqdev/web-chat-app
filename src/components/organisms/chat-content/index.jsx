const ChatContentOrganism = ({ sendMessage }) => {
  const userId = localStorage.getItem("user_id");

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      {sendMessage.length > 0 ? (
        sendMessage.map((message, index) => {
          if (userId === message.sender) {
            return (
              <div key={index} className="flex justify-end mt-3">
                <p className="bg-blue-sky text-white rounded-lg px-4 py-2 w-fit rounded-br-none rounded-tr-3xl">{message.message}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex justify-start mt-3">
                <p className="bg-gray-200 text-black rounded-lg px-4 py-2 w-fit rounded-bl-none rounded-tl-3xl">{message.message}</p>
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
