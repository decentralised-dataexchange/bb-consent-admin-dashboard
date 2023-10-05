import axios from "axios";
import {
  ENDPOINTS,
  STAGING_BASE_URL,
  DEMO_BASE_URL,
} from "../settings/settings";

const httpClient = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "staging" ? STAGING_BASE_URL : DEMO_BASE_URL,
});

// TODO: Use interceptor to do common error handling for all API calls.
// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error)
// }
// );

export const HttpService = {
  login: async (username: string, password: string): Promise<any> => {
    const payload: object = {
      username: username,
      password: password,
    };
    return httpClient.post(ENDPOINTS.login, payload);
  },
};
