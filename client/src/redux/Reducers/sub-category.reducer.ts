import {
  SubCategoryInitialState,
  SubCategoryReducerActionTypes,
} from "../../const/types/sub-category";

const initialState: SubCategoryInitialState = {
  loading: false,
  subCategories: [],
};

export default function (
  state = initialState,
  action: SubCategoryReducerActionTypes
) {
  switch (action.type) {
    case "LOADING_SUB_CATEGORY":
    case "FETCH_ALL_SUB_CATEGORIES":
      return { ...state, ...action.payload };
    case "CREATE_SUB_CATEGORY":
      state.subCategories.push(action.payload.subCategory);
      return { ...state };
    case "UPDATE_SUB_CATEGORY":
      return {
        ...state,
        subCategories: state.subCategories.map((s) =>
          s.slug === action.payload.prevslug
            ? action.payload.updatedSubCategory
            : s
        ),
      };
    case "DELETE_SUB_CATEGORY":
      return {
        ...state,
        subCategories: state.subCategories.filter(
          ({ slug }) => slug !== action.payload.subCategory.slug
        ),
      };
    default:
      return state;
  }
}
