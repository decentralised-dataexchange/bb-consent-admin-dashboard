import { User } from "../interfaces/User";
import { AccessToken } from "../interfaces/AccessToken";

export const LocalStorageService = {
  updateToken: (token: AccessToken) => {
    localStorage.setItem("Token", JSON.stringify(token));
  },
  updateUser: (user: User) => {
    localStorage.setItem("User", JSON.stringify(user));
  },
  getUser: (): User => {
    return JSON.parse(localStorage.getItem("User")!);
  },
  getAccessToken: () => {
    return JSON.parse(localStorage.getItem("Token")!)?.access_token;
  },
  getOrganisationId: () => {
    return JSON.parse(localStorage.getItem("User")!)?.roles[0]?.orgId;
  },
  getRefreshToken: () => {
    return JSON.parse(localStorage.getItem("Token")!)?.refresh_token;
  },
  clear: () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
  },
};
