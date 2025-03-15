import { selector } from "recoil";
import { userState, pageConfigState } from "./atoms";

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

export const pageThemeSelector = selector({
  key: "pageThemeSelector",
  get: ({ get }) => {
    const pageConfig = get(pageConfigState);
    return (
      pageConfig?.theme || {
        primary: "blue",
        secondary: "gray",
        accent: "yellow",
        background: "light",
        fontFamily: "sans",
      }
    );
  },
});

export const pageSectionsSelector = selector({
  key: "pageSectionsSelector",
  get: ({ get }) => {
    const pageConfig = get(pageConfigState);
    return pageConfig?.sections || [];
  },
});
