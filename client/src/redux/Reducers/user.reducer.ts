import { UserReducerActionTypes, UserReduxState } from "../../const/types";
import jwtDecode from "jwt-decode";

import { AppLocalStorage } from "../../utils/AppLocalStorage";

const initialState: UserReduxState = {
  loading: false,
  email: null,
  token: null,
  name: null,
  role: null,
  _id: null,
};

let token = AppLocalStorage.getItem("USER_AUTH_TOKEN");
if (token) {
  const decodedToken = jwtDecode(token) as { exp: number };
  if (decodedToken.exp * 1000 < Date.now()) {
    AppLocalStorage.removeItem("USER_AUTH_TOKEN");
    AppLocalStorage.removeItem("USER_ROLE");
  }
}

export default function (state = initialState, action: UserReducerActionTypes) {
  switch (action.type) {
    case "LOGGED_IN_USER":
    case "LOGOUT":
    case "LOADING_USER":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
