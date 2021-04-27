import { ThunkDispatch } from "redux-thunk";
import {
  CategoryReducerActionTypes,
  CategoryType,
  AlertActionTypes,
} from "../../const/types";
import { CategoryServices } from "../../services/category.services";
import { printMessage } from "../../const/printMessage";
import { setAlertMessage } from "./alert.action";

let type: AlertActionTypes = "success";
let message: string | null = null;
let description: string | undefined = undefined;

const categoryAction = ({ type, payload }: CategoryReducerActionTypes) => ({
  type,
  payload,
});

export const loadingCategory = (loading: boolean) => {
  return categoryAction({
    type: "LOADING_CATEGORY",
    payload: { loading },
  });
};

export const createCategory = (name: string, callback: () => void) => async (
  dispatch: ThunkDispatch<{}, {}, CategoryReducerActionTypes>
) => {
  try {
    dispatch(loadingCategory(true));

    const data = (await CategoryServices.createCategory(name))
      .data as CategoryType;

    dispatch({
      type: "SET_CATEGORY",
      payload: {
        category: data,
      },
    });

    if (callback) callback();

    type = "success";
    message = "Success";
    description = `Category '${data.name}' created successfully.`;
  } catch (error) {
    printMessage("category.action.ts => createCategory()", error?.response);
    type = "error";
    message = "Error";
    description = "Please login again to create category";

    if (
      Array.isArray(error.response.data.errors) &&
      error.response.data.errors[0].message
    ) {
      description = error.response.data.errors[0].message as string;
    }
  } finally {
    dispatch(loadingCategory(false));
    dispatch(
      setAlertMessage({
        type,
        message,
        description,
      })
    );
  }
};

export const updateCategory = (name: string, callback?: () => void) => async (
  dispatch: ThunkDispatch<{}, {}, CategoryReducerActionTypes>
) => {
  try {
    dispatch(loadingCategory(true));

    const data = (await CategoryServices.createCategory(name))
      .data as CategoryType;

    dispatch({
      type: "SET_CATEGORY",
      payload: {
        category: data,
      },
    });

    if (callback) callback();

    type = "success";
    message = "Success";
    description = `Category '${name}' updated successfully.`;
  } catch (error) {
  } finally {
    dispatch(loadingCategory(true));
  }
};

export const fetchCategories = () => async (
  dispatch: ThunkDispatch<{}, {}, CategoryReducerActionTypes>
) => {
  try {
    dispatch(loadingCategory(true));
    const data = (await CategoryServices.getAllCategories())
      .data as CategoryType[];

    dispatch(
      categoryAction({
        type: "SET_CATEGORIES",
        payload: { categories: data },
      })
    );
  } catch (error) {
    printMessage("category.action fetchCategoriesee", error);
  } finally {
    dispatch(loadingCategory(false));
  }
};

export const deleteCategory = (slug: string) => async (
  dispatch: ThunkDispatch<{}, {}, CategoryReducerActionTypes>
) => {
  try {
    dispatch(loadingCategory(true));
    const { data } = await CategoryServices.deleteCategory(slug);

    type = "success";
    message = "Success";
    description = data.message as string;

    dispatch({ type: "REMOVE_CATEGORY", payload: { slug } });
  } catch (error) {
    printMessage("Category.action => deleteCategory()", error);
    printMessage("Category.action => deleteCategory()", error.code);
    type = "error";
    message = "Error";
    description = "Check console to find the real cause";
  } finally {
    dispatch(loadingCategory(false));
    dispatch(setAlertMessage({ type, message, description }));
  }
};
