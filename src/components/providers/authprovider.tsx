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
        const token = res.data;
        LocalStorageService.updateToken(token);
        // LocalStorageService.updateUser(res.user);
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
  // logout: () => {
  //   return HttpService.logout()
  //     .then((res) => {})
  //     .catch((error) => {});
  // },
  logout: (params: any): Promise<any> => Promise.resolve(),
  getIdentity: (): Promise<any> => {
    try {
      // const { LastVisit, Name, ImageURL, Email } = LocalStorageService.getUser();
      // Currently passing empty values for below values, need to update once user data are available
      const { LastVisit, Name, ImageURL, Email } = {
        LastVisit: "",
        Name: "",
        ImageURL: "",
        Email: "",
      };
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
