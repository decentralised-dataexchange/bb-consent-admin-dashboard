import { HttpService } from "../../service/services";

export const authProvider = {
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
        localStorage.setItem("auth", JSON.stringify(auth));
        return res;
      })
      .catch((error) => {
        throw (error.response.data.error_description ? error.response.data.error_description : error.response.data.Message );
      });
  },
  checkError: (error: any): Promise<any> => Promise.resolve(),
  checkAuth: () =>
    JSON.parse(localStorage.getItem("auth")!)?.Token?.access_token
      ? Promise.resolve()
      : Promise.reject({ message: false }),
  logout: (): Promise<any> => Promise.resolve(),
  getIdentity: (): Promise<any> => Promise.resolve(),
  getPermissions: (params: any): Promise<any> => Promise.resolve(),
};
