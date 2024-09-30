import { create } from "zustand";
import apiRequest from "./apiRequest.js";

export const useNotificationStore = create((set) => ({
  number: 0,

  fetch: async () => {
    try {
      const res = await apiRequest("/users/notification");

      set({ number: res?.data });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Handle error gracefully here, such as setting a default value or showing an error message
      set({ number: 0 }); // Reset number to 0 on error
    }
  },

  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },

  reset: () => {
    set({ number: 0 });
  },
}));
