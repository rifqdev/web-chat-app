import Image from "next/image";

const SettingsTemplate = ({ handleActiveSidebar }) => {
  return (
    <div className="bg-white col-span-3 p-5 overflow-y-auto pb-20">
      <div className="w-full flex items-center justify-between">
        <Image src="/back.svg" alt="avatar" width={10} height={10} className="cursor-pointer" onClick={() => handleActiveSidebar("chatlist")} />
        <h1 className="text-blue-sky font-semibold text-xl flex-1 text-center">@username</h1>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div>
          <Image src="/Rectangle-8.svg" alt="avatar" width={100} height={100} />
        </div>
        <div className="text-center mt-5">
          <h1 className="text-black font-semibold text-xl">Jhonson</h1>
          <h3 className="text-gray-500">@username</h3>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-black font-semibold text-xl">Account</h1>
        <div>
          <p className="text-gray-500 mt-3">55563abc</p>
          <p className="text-blue-sky cursor-pointer hover:underline">Tap to copy pin</p>
          <hr className="mt-3" />
        </div>
        <div>
          <p className="text-black font-semibold mt-3">@username</p>
          <p className="text-gray-500 cursor-pointer hover:underline">Username</p>
          <hr className="mt-3" />
        </div>
        <div>
          <p className="text-black font-semibold mt-3 w-10/12">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, et?</p>
          <p className="text-gray-500 cursor-pointer hover:underline">Bio</p>
          <hr className="mt-3" />
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-black font-semibold text-xl">Settings</h1>
        <div className="flex gap-3 items-center mt-3">
          <Image src="/union.svg" alt="notification" width={20} height={20} />
          <p className="text-black cursor-pointer hover:underline text-lg">Notification</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsTemplate;
