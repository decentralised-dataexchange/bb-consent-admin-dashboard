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
import {
  DataAgreementsResponse,
  convertPurposeForClient,
  DataAgreement,
} from "../interfaces/DataAgreement";
import {
  DataAttributepayloadInterface,
  DataAttributeInterface,
} from "../interfaces/DataAttribute";

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
    const refreshToken = LocalStorageService.getRefreshToken();
    const res = await HttpService.refreshToken(refreshToken);
    LocalStorageService.updateToken(res.data); // Assuming this function is implemented to update token in local storage
    return res.data.accessToken;
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
        originalRequest.headers.Authorization = "Bearer " + newToken;
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
  // logout: async (): Promise<any> => {
  //   const config: object = {
  //     headers: { ...getAuthenticatedHeaders() },
  //   };
  //   const refresh_token = LocalStorageService.getRefreshToken();
  //   const payload: object = {
  //     clientid: CLIENTID,
  //     refreshtoken: refresh_token,
  //   };
  //   return httpClient.post(ENDPOINTS.logout(), payload, config);
  // },
  refreshToken: async (refresh_token: string): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    // const refresh_token = LocalStorageService.getRefreshToken()
    const payload: object = {
      clientId: CLIENTID,
      refreshToken: refresh_token,
    };
    return httpClient.post(ENDPOINTS.refreshToken(), payload, config);
  },
  getOrganisationDetails: async (): Promise<Organization> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.getOrganisationDetails(), config)
      .then((res) => {
        return res.data.organisation;
      });
  },
  getCoverImage: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
      responseType: "arraybuffer",
    };
    return httpClient.get(ENDPOINTS.getCoverImage(), config).then((res) => {
      return imageBlobToBase64(res.data);
    });
  },
  getLogoImage: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
      responseType: "arraybuffer",
    };
    return httpClient.get(ENDPOINTS.getLogoImage(), config).then((res) => {
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
      .post(ENDPOINTS.updateOrganisationLogoImage(), payload, config)
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
      .post(ENDPOINTS.updateOrganisationCoverImage(), payload, config)
      .then((res) => {
        return res.data.Organization;
      });
  },
  updateOrganisationDetails: async (
    payload: UpdateOrganisationReq
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updateOrganisationDetails(),
      payload,
      config
    );
  },
  listDataAgreements: async (): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(ENDPOINTS.getDataAgreements(), config).then((res) => {
      const dataAgreements: DataAgreementsResponse = res.data;
      return convertPurposeForClient(dataAgreements);
    });
  },
  addDataAgreements: async (payload: DataAgreement): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addDataAgreements(), payload, config);
  },
  listDataAttributes: async (): Promise<DataAttributeInterface[]> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient
      .get(ENDPOINTS.listDataAttributes(), config)
      .then((res) => {
        return res.data.dataAttributes;
      });
  },
  addDataAttributes: async (
    payload: any,
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.post(ENDPOINTS.addDataAttributes(), payload, config);
  },
  updateDataAttributes: async (
    payload: any,
    dataAttributeId: string
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.put(
      ENDPOINTS.updateDataAttributesById(dataAttributeId),
      payload,
      config
    );
  },
  deleteDataAgreement: async (
    dataAgreementId: any
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.delete(
      ENDPOINTS.deleteDataAgreement(dataAgreementId),
      config
    );
  },
  getDataAgreementByID: async (
    dataAgreementId: any
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(
      ENDPOINTS.getDataAgreementByID(dataAgreementId),
      config
    );
  },
  getDataAttributesByDataAgreementId:  async (
    dataAgreementId: any
  ): Promise<any> => {
    const config: object = {
      headers: { ...getAuthenticatedHeaders() },
    };
    return httpClient.get(
      ENDPOINTS.getDataAttributesByDataAgreementId(dataAgreementId),
      config
    );
  },
};
