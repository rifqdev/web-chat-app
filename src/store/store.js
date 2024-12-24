import { create } from "zustand";

export const useChatStore = create((set) => ({
  chat: [],
  setChat: (chat) => set({ chat }),
}));
