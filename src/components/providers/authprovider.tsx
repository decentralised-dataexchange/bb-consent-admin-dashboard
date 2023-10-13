import { HttpService } from "../../service/HTTPService";
import { addRefreshAuthToAuthProvider } from "react-admin";
import { refreshAuth } from "./refreshAuth";
import { LocalStorageService } from "../../service/localStorageService";

export const myAuthProvider = {
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): any => {
    return HttpService.login(username, password)
      .then((res) => {
        const auth = res.data;
        LocalStorageService.updateToken(auth.Token);
        LocalStorageService.updateUser(auth.User);
        return res.data;
      })
      .catch((error) => {
        throw error.response.data.error_description
          ? error.response.data.error_description
          : error.response.data.Message;
      });
  },
  checkError: (error: any): Promise<any> => Promise.resolve(),
  checkAuth: () =>
    LocalStorageService.getAccessToken()
      ? Promise.resolve()
      : Promise.reject({ message: false }),
  logout: () => {
    return HttpService.logout()
      .then((res) => {})
      .catch((error) => {});
  },
  getIdentity: (): Promise<any> => {
    try {
      const { LastVisit, Name, ImageURL, Email } =
        LocalStorageService.getUser();
      return Promise.resolve({ LastVisit, Name, ImageURL, Email });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: (params: any): Promise<any> => Promise.resolve(),
};

export const authProvider = addRefreshAuthToAuthProvider(
  myAuthProvider,
  refreshAuth
);
