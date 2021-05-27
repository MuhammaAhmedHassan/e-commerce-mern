export interface ISearchInitialState {
  loading: boolean;
  searchText: string;
}

export type SearchLoading = {
  type: "SEARCH_LOADING";
  payload: { loading: boolean };
};

export type SetSearchText = {
  type: "SET_SEARCH_TEXT";
  payload: { searchText: string };
};

export type SearchActionTypes = SearchLoading | SetSearchText;
