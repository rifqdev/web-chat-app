import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import NotificationSoundModalOrganism from "@/components/organisms/notification-sound-modal";
import { logout, getProfile, updateUsername, updateBio, updateFullname, updatePhoto } from "@/utils/api";
import InputElement from "@/components/elements/input";
import ButtonElement from "@/components/elements/button";

const SettingsTemplate = ({ handleActiveSidebar }) => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [showInputUsername, setShowInputUsername] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTextAreaBio, setShowTextAreaBio] = useState(false);
  const [bio, setBio] = useState("");
  const [showInputFullname, setShowInputFullname] = useState(false);
  const [fullname, setFullname] = useState("");
  const [photo, setPhoto] = useState("");
  const [showButtonUpdatePhoto, setShowButtonUpdatePhoto] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState("");

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      setProfile(response.data);
    };
    fetchProfile();
  }, [loading]);

  const handleShowInputUsername = () => {
    setShowInputUsername(!showInputUsername);
  };

  const handleUpdateUsername = async () => {
    setLoading(true);
    const response = await updateUsername({ username });
    setShowInputUsername(false);
    setLoading(false);
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(profile?.pin);
  };

  const handleShowTextAreaBio = () => {
    setShowTextAreaBio(!showTextAreaBio);
  };

  const handleUpdateBio = async () => {
    setLoading(true);
    const response = await updateBio({ bio });
    setShowTextAreaBio(false);
    setLoading(false);
  };

  const handleShowInputFullname = () => {
    setShowInputFullname(!showInputFullname);
  };

  const handleUpdateFullname = async () => {
    setLoading(true);
    if (fullname === "") {
      alert("Fullname is required");
      return;
    }
    const response = await updateFullname({ fullname });
    setShowInputFullname(false);
    setLoading(false);
  };

  const fileInputRef = useRef(null);
  const handleOpenFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click pada input file
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
      setShowButtonUpdatePhoto(true);
    }
  };

  const handleCancelUpdatePhoto = () => {
    setShowButtonUpdatePhoto(false);
    setPreviewPhoto("");
  };

  const handleUpdatePhoto = async () => {
    setLoading(true);
    if (photo === "") {
      alert("Photo is required");
      return;
    }
    const formData = new FormData();
    formData.append("photo", photo);
    const response = await updatePhoto(formData);
    setShowButtonUpdatePhoto(false);
    setLoading(false);
  };

  return (
    <div className="bg-white col-span-3 p-5 overflow-y-auto pb-20">
      <div className="w-full flex items-center justify-between">
        <Image src="/back.svg" alt="avatar" width={10} height={10} className="cursor-pointer" onClick={() => handleActiveSidebar("chatlist")} />
        <h1 className="text-blue-sky font-semibold text-xl flex-1 text-center">{profile?.username ? `@${profile?.username}` : "Username"}</h1>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="bg-gray-200 rounded-full p-1 w-20 h-20 cursor-pointer">
          <Image
            src={previewPhoto ? previewPhoto : profile?.photo ? profile?.photo : "/Rectangle-8.svg"}
            className="rounded-full w-full h-full object-cover"
            alt="avatar"
            width={50}
            height={50}
            onClick={handleOpenFile}
          />
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          <div className={`${showButtonUpdatePhoto ? "block" : "hidden"} flex gap-2 items-center justify-between`}>
            <p className=" text-red-500 text-xl" onClick={handleCancelUpdatePhoto}>
              x
            </p>
            <p className=" text-green-500 text-xl" onClick={handleUpdatePhoto}>
              ✓
            </p>
          </div>
        </div>
        <div className="text-center mt-5">
          <h1 className={`text-black font-semibold text-xl ${showInputFullname ? "hidden" : "block"}`} onClick={handleShowInputFullname}>
            {profile?.fullname}
          </h1>
          <div className={`${showInputFullname ? "block" : "hidden"}`}>
            <InputElement
              className="border p-2 w-full rounded-lg text-black outline-none"
              placeholder="Fullname"
              defaultValue={profile?.fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <ButtonElement className="bg-blue-sky text-white px-2 mt-3 rounded-lg ml-auto block" onClick={handleUpdateFullname}>
              Update
            </ButtonElement>
          </div>
          <h3 className="text-gray-500">{profile?.username ? `@${profile?.username}` : "Username"}</h3>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-black font-semibold text-xl">Account</h1>
        <div>
          <p className="text-gray-500 mt-3">{profile?.pin}</p>
          <p className="text-blue-sky cursor-pointer hover:underline" onClick={handleCopyPin}>
            Tap to copy pin
          </p>
          <hr className="mt-3" />
        </div>
        <div>
          <p className={`text-black font-semibold mt-3 ${showInputUsername ? "hidden" : "block"}`}>
            {profile?.username ? `@${profile?.username}` : "Username"}
          </p>
          <div className={`${showInputUsername ? "block" : "hidden"}`}>
            <InputElement
              className="border p-2 w-full rounded-lg text-black outline-none"
              placeholder="Username"
              defaultValue={profile?.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <ButtonElement className="bg-blue-sky text-white px-2 mt-3 rounded-lg ml-auto block" onClick={handleUpdateUsername}>
              Update
            </ButtonElement>
          </div>
          <p className="text-gray-500 cursor-pointer hover:underline" onClick={handleShowInputUsername}>
            Username
          </p>
          <hr className="mt-3" />
        </div>
        <div>
          <p className={`text-black font-semibold mt-3 ${showTextAreaBio ? "hidden" : "block"}`}>{profile?.bio}</p>
          <div className={`${showTextAreaBio ? "block" : "hidden"}`}>
            <textarea
              className="border p-2 w-full rounded-lg text-black outline-none mt-3"
              placeholder="Bio"
              defaultValue={profile?.bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <ButtonElement className="bg-blue-sky text-white px-2 mt-3 rounded-lg ml-auto block" onClick={handleUpdateBio}>
              Update
            </ButtonElement>
          </div>
          <p className="text-gray-500 cursor-pointer hover:underline" onClick={handleShowTextAreaBio}>
            Bio
          </p>
          <hr className="mt-3" />
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-black font-semibold text-xl">Settings</h1>
        <div className="flex gap-3 items-center mt-3">
          <Image src="/union.svg" alt="notification" width={20} height={20} />
          <p className="text-black cursor-pointer hover:underline text-lg" onClick={handleShowModal}>
            Notification
          </p>
        </div>
        <div className="mt-5" onClick={logout}>
          <Link href="/auth/login" className="text-blue-sky cursor-pointer hover:underline text-lg">
            Logout
          </Link>
        </div>
      </div>
      {/* modal select notification */}
      <NotificationSoundModalOrganism showModal={showModal} handleShowModal={handleShowModal} />
    </div>
  );
};

export default SettingsTemplate;
