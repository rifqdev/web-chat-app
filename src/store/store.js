import { create } from "zustand";

export const useChatStore = create((set) => ({
  chat: [],
  chatId: null,
  sound: "/notification/mixkit-bell.wav",

  setChatId: (chatId) => set({ chatId }),
  setChat: (chat) => set({ chat }),
  setSound: (sound) => set({ sound }),
}));
