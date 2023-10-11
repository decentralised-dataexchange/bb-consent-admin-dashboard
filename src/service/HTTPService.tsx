import axios from "axios";
import {
  ENDPOINTS,
  STAGING_BASE_URL,
  DEMO_BASE_URL,
  CLIENTID,
} from "../settings/settings";
import { LocalStorageService } from "./localStorageService";
import { Organization } from "../interfaces/Organisation";
import { imageBlobToBase64 } from "../utils/imageUtils";
import { UpdateOrganisationReq } from "../interfaces/UpdateOrganisation";
import { refreshAuth } from "../components/providers/refreshAuth";
import { AccessTokenClaims } from "../interfaces/AccessToken";

const httpClient = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "staging" ? STAGING_BASE_URL : DEMO_BASE_URL,
});

const getAuthenticatedHeaders = () => {
  return {
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };
};

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const accessToken = LocalStorageService.getAccessToken();
//       const refreshToken = LocalStorageService.getRefreshToken();
//       if (accessToken) {
//         const claims: AccessTokenClaims = JSON.parse(
//           atob(accessToken.split(".")[1])
//         );

//         const currentTime = Date.now() / 1000 + 300;
//         const expiryTime = claims.exp;
//         if (expiryTime < currentTime) {
//           // This function will fetch the new tokens from the authentication service and update them in localStorage
//           HttpService.refreshToken(refreshToken).then((res) => {
//             console.log("Successfully refreshed the token");
//             LocalStorageService.updateToken(res.data);
//             originalRequest.headers["Authorization"] =
//               "Bearer " + res.data.access_token;

//             console.log("After refresh; access token: ", res.data.access_token);
//           });
//         }
//       }


//       console.log("We are about to retry!!!");
//       console.log(originalRequest.headers["Authorization"]);
//       return httpClient.request(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );

export const HttpService = {
  login: async (username: string, password: string): Promise<any> => {
    const payload: object = {
      username: username,
      password: password,
    };
    return httpClient.post(ENDPOINTS.login(), payload);
  },
  logout: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    const refresh_token = LocalStorageService.getRefreshToken();
    const payload: object = {
      clientid: CLIENTID,
      refreshtoken: refresh_token,
    };
    return httpClient.post(ENDPOINTS.logout(), payload, config);
  },
  refreshToken: async (refresh_token: string): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    // const refresh_token = LocalStorageService.getRefreshToken()
    const payload: object = {
      clientid: CLIENTID,
      refreshtoken: refresh_token,
    };
    return httpClient.post(ENDPOINTS.refreshToken(), payload, config);
  },
  getOrganisationDetails: async (): Promise<Organization> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(
        ENDPOINTS.getOrganisationDetails(
          LocalStorageService.getOrganisationId()
        ),
        config
      )
      .then((res) => {
        return res.data.Organization;
      });
  },
  getCoverImage: async (imageId: string): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
      responseType: "arraybuffer",
    };
    return httpClient
      .get(
        ENDPOINTS.getCoverImage(
          LocalStorageService.getOrganisationId(),
          imageId
        ),
        config
      )
      .then((res) => {
        return imageBlobToBase64(res.data);
      });
  },
  getLogoImage: async (imageId: string): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
      responseType: "arraybuffer",
    };
    return httpClient
      .get(
        ENDPOINTS.getLogoImage(
          LocalStorageService.getOrganisationId(),
          imageId
        ),
        config
      )
      .then((res) => {
        return imageBlobToBase64(res.data);
      });
  },
  updateOrganisationLogoImage: async (formData: any): Promise<Organization> => {
    const config: object = {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "content-type": "multipart/form-data",
      },
    };
    const payload = formData;
    return httpClient
      .post(
        ENDPOINTS.updateOrganisationLogoImage(
          LocalStorageService.getOrganisationId()
        ),
        payload,
        config
      )
      .then((res) => {
        return res.data.Organization;
      });
  },
  updateOrganisationCoverImage: async (
    formData: any
  ): Promise<Organization> => {
    const config: object = {
      headers: {
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
        "content-type": "multipart/form-data",
      },
    };
    const payload = formData;
    return httpClient
      .post(
        ENDPOINTS.updateOrganisationCoverImage(
          LocalStorageService.getOrganisationId()
        ),
        payload,
        config
      )
      .then((res) => {
        return res.data.Organization;
      });
  },
  updateOrganisationDetails: async (
    payload: UpdateOrganisationReq
  ): Promise<any> => {
    console.log("Inside updateOrganisationDetails");

    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.patch(
      ENDPOINTS.updateOrganisationDetails(
        LocalStorageService.getOrganisationId()
      ),
      payload,
      config
    );
  },
};
