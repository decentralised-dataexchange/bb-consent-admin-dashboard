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

const httpClient = axios.create({
  baseURL:
    process.env.REACT_APP_ENV === "staging" ? STAGING_BASE_URL : DEMO_BASE_URL,
});

const getAuthenticatedHeaders = () => {
  return {
    Authorization: "Bearer " + LocalStorageService.getAccessToken(),
  };
};

export const refreshTokenAndUpdateLocalStorage = async () => {
  try {
    const refresh_token = LocalStorageService.getRefreshToken();
    const res = await HttpService.refreshToken(refresh_token);
    LocalStorageService.updateToken(res.data); // Assuming this function is implemented to update token in local storage
    return res.data.access_token;
  } catch (error) {
    console.error("Unable to refresh token", error);
    throw error; // Re-throwing error after logging it for further handling in the calling function
  }
};

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.config.url !== ENDPOINTS.refreshToken()
    ) {
      originalRequest._retry = true;
      try {
        // Using the new function here
        const newToken = await refreshTokenAndUpdateLocalStorage();

        // Update Authorization in the original request and retry it
        originalRequest.headers.Authorization = 'Bearer ' + newToken;
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Further handling token refresh error if needed, e.g., redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

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
