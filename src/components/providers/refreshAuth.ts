import { LocalStorageService } from "../../service/localStorageService";
import { HttpService } from "../../service/HTTPService";
import { AccessTokenClaims } from "../../interfaces/AccessToken";

export const refreshAuth = () => {
  const accessToken = LocalStorageService.getAccessToken();
  const refreshToken = LocalStorageService.getRefreshToken();
  if (accessToken) {
    const claims: AccessTokenClaims = JSON.parse(
      atob(accessToken.split(".")[1])
    );

    const currentTime = (Date.now() / 1000) + 300;
    const expiryTime = claims.exp;
    if (expiryTime < currentTime) {
      // This function will fetch the new tokens from the authentication service and update them in localStorage
      return HttpService.refreshToken(refreshToken).then((res) => {
        console.log("Successfully refreshed the token");
        LocalStorageService.updateToken(res.data);
      });
    }
  }

  return Promise.resolve();
};
