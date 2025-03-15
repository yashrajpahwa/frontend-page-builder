import { selector } from "recoil";
import { userState } from "./atoms";

// User authentication status selector
export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user !== null;
  },
});

// User profile data selector
export const userProfileSelector = selector({
  key: "userProfileSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user ? user.profile : null;
  },
});
