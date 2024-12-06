import ModalElement from "@/components/elements/modal";
import Image from "next/image";
import InputElement from "@/components/elements/input";

const mockData = [
  {
    id: 1,
    pin: "123456",
    fullname: "Jhonson",
    username: "@username",
    avatar: "/Rectangle-8.svg",
  },
];

const AddFriendModalOrganism = ({ showModal, handleShowModal }) => {
  return (
    <ModalElement className="absolute top-1/2 left-1/2 rounded-lg p-5 w-1/5 bg-white border shadow-lg z-10">
      <h1 className="text-lg text-blue-sky text-center font-semibold">Add Friend</h1>
      <InputElement className="border p-2 w-full rounded-lg" placeholder="Enter PIN" />
      {mockData.length > 0 ? (
        mockData.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 mt-3 cursor-pointer hover:bg-slate-100 hover:bg-opacity-50 transition-all duration-300 ease-out"
          >
            <Image src={item.avatar} alt="avatar" width={40} height={40} />
            <div>
              <h1 className="text-black font-semibold">{item.fullname}</h1>
            </div>
          </div>
        ))
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
