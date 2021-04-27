import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  ErrorActionTypes,
  AlertReduxState,
  AlertActionTypes,
} from "../../const/types";

const errorAction = (
  type: ErrorActionTypes,
  payload: AlertReduxState = {
    message: null,
    description: undefined,
    type: undefined,
  }
) => ({
  type,
  payload,
});

export const setAlertMessage = (payload: AlertReduxState) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(errorAction("SET_ERRORS", payload));
};

export const clearAlertMessage = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(errorAction("CLEAR_ERRORS"));
};

export const createAlert = (type: AlertActionTypes, description: string) => {
  const message = `${type?.charAt(0)?.toUpperCase()}${type?.substr(1)}`;
  return { type, message, description };
};
