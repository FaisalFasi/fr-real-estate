import { create } from "zustand";
import apiRequest from "./apiRequest";

export const useNotificationStore = create((set) => ({
  number: 0,

  fetch: async () => {
    const res = await apiRequest.get("/users/notification");

    console.log("Response Notifications: ", res);
    set({ number: res?.data });
  },
  decrease: () => {
    console.log("decrease", number);
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    console.log("reset", number);
    set({ number: 0 });
  },
}));
