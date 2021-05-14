import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { History } from "history";
import { auth, firebase } from "../../Firebase";
import { push } from "connected-react-router";
import {
  AlertReduxState,
  UserActionTypes,
  UserReduxState,
} from "../../const/types";
import { AppLocalStorage } from "../../utils/AppLocalStorage";
import {
  adminRoutes,
  generalRoutes,
  onBoardingRoutes,
  userRoutes,
} from "../../const/routes";
import { printMessage } from "../../const/printMessage";
import { AuthServices } from "../../services/auth.services";
import { setAlertMessage } from "./alert.action";

const userAction = (
  type: UserActionTypes,
  payload: Partial<UserReduxState> = { email: null, token: null }
) => ({
  type,
  payload,
});

const isGeneralRoute = () => {
  const pathname = window.location.pathname;
  const isAdminRoute = pathname.indexOf("admin") !== -1;
  const isUserRoute = pathname.indexOf("user") !== -1;
  const isHomeRoute = pathname === "/";
  if (!isAdminRoute || !isUserRoute || isHomeRoute) return true;
  else return false;
};

export const roleBasedRedirect = (
  history: History<unknown>,
  _role?: string | null
) => {
  const role = AppLocalStorage.getItem("USER_ROLE") || _role;
  const pathname = window.location.pathname;
  let pathExists: boolean = false;
  const hasState = !!history.location.state;

  if (isGeneralRoute()) return;
  else if (hasState) {
    const route = (history.location.state as { from: string }).from;
    history.push(route);
  } else if (role === "admin") {
    pathExists = Object.values(adminRoutes).some((path) => path === pathname);
    history.push(pathExists ? pathname : adminRoutes.DASHBOARD);
  } else {
    pathExists = Object.values(userRoutes).some((path) => path === pathname);
    history.push(pathExists ? pathname : generalRoutes.HOME_PAGE);
  }
};

export const loadingUser = (loading: boolean) => {
  return userAction("LOADING_USER", { loading });
};

export const loggedInUser = (user: Partial<UserReduxState>) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  AppLocalStorage.setItem("USER_AUTH_TOKEN", user.token!);
  if (user.role === "admin") AppLocalStorage.setItem("USER_ROLE", "admin");

  dispatch(userAction("LOGGED_IN_USER", user));
};

export const setCurrentUser = (user: firebase.User) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    dispatch(loadingUser(true));
    // Get the idToken
    const idToken = (await user.getIdTokenResult()).token;

    const { data } = await AuthServices.getCurrentUser();

    dispatch(loggedInUser({ email: user.email!, token: idToken, ...data }));
  } catch (error) {
    printMessage("auth.onAuthStateChanged", error);
  } finally {
    dispatch(loadingUser(false));
  }
};

export const logoutUser = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    await firebase.auth().signOut();
    AppLocalStorage.removeItem("USER_AUTH_TOKEN");
    AppLocalStorage.removeItem("USER_ROLE");
    dispatch(userAction("LOGOUT"));

    if (!isGeneralRoute()) dispatch(push(generalRoutes.HOME_PAGE));
  } catch (err) {
    printMessage("logoutUser", err);
  }
};

export const signUpWithEmail = (email: string, callback?: () => void) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  const config = {
    url: process.env.REACT_APP_BASE_URL! + onBoardingRoutes.SIGN_UP_SUCCESS,
    handleCodeInApp: true,
  };

  try {
    // Write this code in its own function
    await auth.sendSignInLinkToEmail(email, config);
    dispatch(
      setAlertMessage({
        type: "success",
        message: "Success",
        description: `Email has sent to ${email}. Click the line to complete your registration`,
      })
    );
    AppLocalStorage.setItem("EMAIL_FOR_REGISTRATION", email);

    if (callback) callback();
  } catch (error) {
    dispatch(
      setAlertMessage({
        type: "error",
        message: "Error",
        description: `An error occurred while sending email to ${email}. Please try again.`,
      })
    );
  }
};

export const handleAuthForm = (
  getUser: () => Promise<firebase.auth.UserCredential>,
  history: History<unknown>,
  operationTypeAndData?: {
    type: "RegisterWithEmailAndPassword";
    password: string;
  }
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    dispatch(loadingUser(true));

    const { user } = await getUser();

    // If we don't have user
    if (!user?.emailVerified) {
      printMessage("HandleAuthForm  -> user is null", user);
      throw new Error("Email not verified.");
    }

    // If user is registring for the first time
    // with email and password
    if (
      operationTypeAndData &&
      operationTypeAndData.type === "RegisterWithEmailAndPassword"
    ) {
      await user!.updatePassword(operationTypeAndData.password);
      AppLocalStorage.removeItem("EMAIL_FOR_REGISTRATION");
    }

    // get the token of the user
    const idToken = (await user!.getIdTokenResult()).token;

    AppLocalStorage.setItem("USER_AUTH_TOKEN", idToken);

    const { data } = await AuthServices.createOrUpdateUser();

    dispatch(
      loggedInUser({
        email: user.email,
        token: idToken,
        name: data.name!,
        role: data.role!,
        _id: data._id!,
      })
    );

    history.push(generalRoutes.HOME_PAGE);
    // roleBasedRedirect(history, data.role);
  } catch (error) {
    printMessage("HandleAuthForm.handleAuthForm()", error);

    let description = `An error occurred while registing. Please try again registration.`;
    switch (error.code) {
      case "auth/wrong-password":
        description = "Invalid credentials";
        break;
      case "auth/user-not-found":
        description = "User not found";
        break;
      case "auth/invalid-action-code":
        description = error.message + "Please try to register again.";
        break;
      default:
        break;
    }

    dispatch(setAlertMessage({ type: "error", message: "Error", description }));
  } finally {
    dispatch(loadingUser(false));
  }
};

export const handleForgotPassword = (
  email: string,
  callback?: () => void
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const config = {
    url: process.env.REACT_APP_BASE_URL! + onBoardingRoutes.LOGIN,
    handleCodeInApp: true,
  };

  dispatch(loadingUser(true));

  try {
    await auth.sendPasswordResetEmail(email, config);
    dispatch(
      setAlertMessage({
        type: "info",
        message: "Info",
        description: "Check your email for password reset link",
      })
    );
    if (callback) callback();
  } catch (err) {
    printMessage("ForgotPassword.onFinish", err);
    dispatch(
      setAlertMessage({
        type: "error",
        message: "Error",
        description: err.message,
      })
    );
  } finally {
    dispatch(loadingUser(false));
  }
};

export const updatePassword = (newPassword: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  let alertObj: AlertReduxState = {
    type: "success",
    message: "Success",
    description: "You password has been updated successfully",
  };

  try {
    dispatch(loadingUser(true));
    await auth.currentUser?.updatePassword(newPassword);
  } catch (error) {
    alertObj = {
      type: "error",
      message: "Error",
      description: "Something went wrong, please try again.",
    };
    if (error.code === "auth/requires-recent-login") {
      alertObj.description = "Please login again to update password";
    }
    printMessage("user.actions.ts => updatePassword", error);
  } finally {
    dispatch(setAlertMessage(alertObj));
    dispatch(loadingUser(false));
  }
};
