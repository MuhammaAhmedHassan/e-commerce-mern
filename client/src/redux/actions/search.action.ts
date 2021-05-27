import { SetSearchText } from "../../const/types/search";

// I think we don't need this
export const setSearchText = (searchText: string): SetSearchText => ({
  type: "SET_SEARCH_TEXT",
  payload: { searchText },
});
