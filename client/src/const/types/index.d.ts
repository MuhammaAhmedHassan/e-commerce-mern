import { AnyAction } from "redux";
import { ProductInitialState } from "./product";
import { SubCategoryInitialState } from "./sub-category";

interface RootState {
  user: UserReduxState;
  error: AlertReduxState;
  category: CategoryReduxState;
  subCategory: SubCategoryInitialState;
  product: ProductInitialState;
}

// User Reducer types
export type UserActionTypes = "LOGGED_IN_USER" | "LOGOUT" | "LOADING_USER";
export type UserReducerActionTypes = {
  type: UserActionTypes;
  payload: Partial<UserReduxState>;
};
export interface UserReduxState {
  email: string | null;
  token: string | null;
  name: string | null;
  role: "subscriber" | "admin" | null;
  _id: string | null;
  loading: boolean;
}

// Category Reducer types
export type CategoryActionTypes =
  | "LOADING_CATEGORY"
  | "SET_CATEGORY"
  | "SET_CATEGORIES"
  | "REMOVE_CATEGORY";

export interface CategoryReducerActionTypes extends AnyAction {
  type: CategoryActionTypes;
  payload: Partial<CategoryReduxState> & Partial<CategoryActionPayload>;
}

export type CategoryActionPayload = {
  category: CategoryType;
  slug: string;
};

export interface CategoryReduxState {
  loading: boolean;
  categories: CategoryType[];
}

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

// Error Reducer types
export type ErrorActionTypes = "SET_ERRORS" | "CLEAR_ERRORS";

export type AlertReducerActionTypes = {
  type: "SET_ERRORS" | "CLEAR_ERRORS";
  payload: Partial<AlertReduxState>;
};

export type AlertActionTypes =
  | "success"
  | "info"
  | "warning"
  | "error"
  | undefined;

export interface AlertReduxState {
  type: AlertActionTypes;
  description: string | undefined;
  message: string | null;
}
