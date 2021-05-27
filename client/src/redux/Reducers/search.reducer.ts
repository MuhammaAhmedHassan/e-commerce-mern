import {
  ISearchInitialState,
  SearchActionTypes,
} from "../../const/types/search";

const initialState: ISearchInitialState = {
  loading: false,
  searchText: "",
};

export default function (state = initialState, action: SearchActionTypes) {
  switch (action.type) {
    case "SEARCH_LOADING":
    case "SET_SEARCH_TEXT": // I think we don't need this type
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
