import { ThunkDispatch } from "redux-thunk";
import { printMessage } from "../../const/printMessage";
import { AlertActionTypes, AlertReduxState } from "../../const/types";
import {
  SubCategory,
  SubCategoryReducerActionTypes,
} from "../../const/types/sub-category";
import { SubCategoryServices } from "../../services/sub-category.services";
import { createAlert, setAlertMessage } from "./alert.action";

let alertMsg: AlertReduxState;

export const fetchSubCategories = () => async (
  dispatch: ThunkDispatch<{}, {}, SubCategoryReducerActionTypes>
) => {
  try {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: true } });

    const subCategories = (await SubCategoryServices.getAllCategories())
      .data as SubCategory[];

    dispatch({ type: "FETCH_ALL_SUB_CATEGORIES", payload: { subCategories } });
  } catch (error) {
    if (error.response.data.errors) {
      alertMsg = createAlert("error", error.response.data.errors[0].message);
    }
  } finally {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: false } });
    dispatch(setAlertMessage(alertMsg));
  }
};

export const createSubCategory = (
  parentCategoryId: string,
  name: string,
  callback: () => void
) => async (dispatch: ThunkDispatch<{}, {}, SubCategoryReducerActionTypes>) => {
  try {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: true } });
    const subCategory = (
      await SubCategoryServices.createCategory(parentCategoryId, name)
    ).data as SubCategory;

    dispatch({
      type: "CREATE_SUB_CATEGORY",
      payload: { subCategory },
    });

    alertMsg = createAlert(
      "success",
      `Sub category ${name} created successfully`
    );

    if (callback) callback();
  } catch (error) {
    printMessage("sub Category => createSubCategory", error.response);
    if (error.response.data.errors) {
      alertMsg = createAlert("error", error.response.data.errors[0].message);
    }
  } finally {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: false } });
    dispatch(setAlertMessage(alertMsg));
  }
};

export const deleteSubCategory = (subCategory: SubCategory) => async (
  dispatch: ThunkDispatch<{}, {}, SubCategoryReducerActionTypes>
) => {
  const { parentCategory, slug, name } = subCategory;
  try {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: true } });
    await SubCategoryServices.deleteCategory(parentCategory, slug);

    dispatch({ type: "DELETE_SUB_CATEGORY", payload: { subCategory } });

    alertMsg = createAlert(
      "success",
      `Sub category ${name} is deleted successfully.`
    );
  } catch (error) {
    if (error.response.data.errors) {
      alertMsg = createAlert("error", error.response.data.errors[0].message);
    }
    printMessage(
      "sub-category.action.ts => deleteSubCategory()",
      error.response
    );
  } finally {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: false } });
    dispatch(setAlertMessage(alertMsg));
  }
};

export const updateSubCategory = (
  subCategory: SubCategory,
  newName: string,
  callback: () => void
) => async (dispatch: ThunkDispatch<{}, {}, SubCategoryReducerActionTypes>) => {
  const { parentCategory, slug, name } = subCategory;
  try {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: true } });
    const updatedSubCategory = (
      await SubCategoryServices.updateCategory(parentCategory, slug, newName)
    ).data;

    dispatch({
      type: "UPDATE_SUB_CATEGORY",
      payload: {
        prevslug: slug,
        updatedSubCategory,
      },
    });

    alertMsg = createAlert(
      "success",
      `Sub category ${slug} updated successfully`
    );

    if (callback) callback();
  } catch (error) {
    if (error.response.data.errors) {
      alertMsg = createAlert("error", error.response.data.errors[0].message);
    }
  } finally {
    dispatch({ type: "LOADING_SUB_CATEGORY", payload: { loading: false } });
    dispatch(setAlertMessage(alertMsg));
  }
};
