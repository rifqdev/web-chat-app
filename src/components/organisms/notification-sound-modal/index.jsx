import ModalElement from "@/components/elements/modal";
import { useRef } from "react";

const NotificationSoundModalOrganism = ({ showModal, handleShowModal }) => {
  const audioRef = useRef(null);

  const handlePlaySound = (sound) => {
    audioRef.current.src = sound;
    audioRef.current.play();
    saveSoundToLocalStorage(sound);
  };

  const saveSoundToLocalStorage = (sound) => {
    localStorage.setItem("sound", sound);
  };

  return (
    <ModalElement className={`absolute top-1/2 left-1/2 rounded-lg p-5 w-1/5 bg-white border shadow-lg z-10 ${showModal ? "block" : "hidden"}`}>
      <div className="relative" onClick={() => handleShowModal(!showModal)}>
        <p className="absolute -right-[30px] -top-[30px] font-bold text-red-500 cursor-pointer bg-white px-1 border rounded-full">X</p>
      </div>
      <h1 className="text-lg text-blue-sky text-center font-semibold">Select Sound</h1>
      <ul>
        <li onClick={() => handlePlaySound("/notification/mixkit-bell.wav")} className="text-black cursor-pointer hover:underline text-lg">
          Bell
          <audio ref={audioRef} src="/notification/mixkit-bell.wav"></audio>
        </li>
        <li
          onClick={() => handlePlaySound("/notification/software-interface-start.wav")}
          className="text-black cursor-pointer hover:underline text-lg"
        >
          Software Interface Start
          <audio ref={audioRef} src="/notification/software-interface-start.wav"></audio>
        </li>
      </ul>
    </ModalElement>
  );
};

export default NotificationSoundModalOrganism;
