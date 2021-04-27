import axios from "axios";
import { authApiRoutes } from "../const/apiRoutes";
import { AppLocalStorage } from "../utils/AppLocalStorage";

export class AuthServices {
  static idToken = () => AppLocalStorage.getItem("USER_AUTH_TOKEN");

  static async createOrUpdateUser() {
    const token = AuthServices.idToken();
    return await axios.post(
      authApiRoutes.createOrUpdateUser,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
  }

  static async getCurrentUser() {
    const token = AuthServices.idToken();

    return await axios.get(authApiRoutes.currentUser, {
      headers: {
        authorization: token,
      },
    });
  }
}
