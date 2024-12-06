import Image from "next/image";
import InputElement from "@/components/elements/input";

const mockData = [
  {
    id: 1,
    avatar: "/Rectangle-8.svg",
    fullname: "Jhonson",
    username: "@username",
  },
  {
    id: 2,
    avatar: "/Rectangle-8.svg",
    fullname: "Jhonson",
    username: "@username",
  },
  {
    id: 3,
    avatar: "/Rectangle-8.svg",
    fullname: "Jhonson",
    username: "@username",
  },
  {
    id: 4,
    avatar: "/Rectangle-8.svg",
    fullname: "Jhonson",
    username: "@username",
  },
  {
    id: 5,
    avatar: "/Rectangle-8.svg",
    fullname: "Jhonson",
    username: "@username",
  },
  {
    id: 6,
    avatar: "/Rectangle-8.svg",
    fullname: "Jhonson",
    username: "@username",
  },
  {
    id: 7,
    avatar: "/Rectangle-8.svg",
    fullname: "Jhonson",
    username: "@username",
  },
];

const ContactsTemplate = ({ handleActiveSidebar }) => {
  return (
    <div className="bg-white col-span-3 p-5 overflow-y-auto pb-20">
      <div className="w-full flex items-center justify-between">
        <Image src="/back.svg" alt="avatar" width={10} height={10} className="cursor-pointer" onClick={() => handleActiveSidebar("chatlist")} />
        <h1 className="text-blue-sky font-semibold text-xl flex-1 text-center">Contacts</h1>
      </div>
      <div className="flex items-center mt-5 gap-3">
        <InputElement className="border p-2 w-full rounded-lg" placeholder="Search" />
      </div>
      <div className="mt-8">
        {mockData.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 mt-3 cursor-pointer hover:bg-slate-100 hover:p-1 transition-all duration-300 ease-out"
          >
            <Image src={item.avatar} alt="avatar" width={40} height={40} />
            <div>
              <h1 className="text-black font-semibold">{item.fullname}</h1>
              <p className="text-slate-500">{item.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsTemplate;
