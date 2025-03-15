import { atom } from "recoil";

// User state atom
export const userState = atom({
  key: "userState",
  default: null,
});

// Loading state atom
export const loadingState = atom({
  key: "loadingState",
  default: false,
});

// Error state atom
export const errorState = atom({
  key: "errorState",
  default: null,
});

export const pageConfigState = atom({
  key: "pageConfigState",
  default: null,
});

export const notificationState = atom({
  key: "notificationState",
  default: {
    show: false,
    message: "",
    type: "info", // 'info', 'success', 'warning', 'error'
  },
});
