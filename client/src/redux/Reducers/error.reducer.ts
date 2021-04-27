import { AlertReducerActionTypes } from "../../const/types";

const initialState = {
  message: null,
  description: undefined,
  type: undefined,
};

export default function (
  state = initialState,
  { type, payload }: AlertReducerActionTypes
) {
  switch (type) {
    case "SET_ERRORS":
      return {
        ...state,
        ...payload,
      };

    case "CLEAR_ERRORS":
      return { ...state, message: null, type: undefined };

    default:
      return state;
  }
}
