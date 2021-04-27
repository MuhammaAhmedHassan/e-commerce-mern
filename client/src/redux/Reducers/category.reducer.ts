import { printMessage } from "../../const/printMessage";
import {
  CategoryReducerActionTypes,
  CategoryReduxState,
  CategoryType,
} from "../../const/types";

const initialState: CategoryReduxState = {
  loading: false,
  categories: [],
};

export default function (
  state = initialState,
  action: CategoryReducerActionTypes
) {
  switch (action.type) {
    case "LOADING_CATEGORY":
      return { ...state, loading: action.payload.loading! };

    case "SET_CATEGORY":
      return {
        ...state,
        categories: [action.payload.category!, ...state.categories],
      };

    case "SET_CATEGORIES":
      return {
        ...state,
        categories: [...action.payload.categories!],
      };

    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          ({ slug }) => slug !== action.payload.slug
        ),
      };
    default:
      return state;
  }
}
