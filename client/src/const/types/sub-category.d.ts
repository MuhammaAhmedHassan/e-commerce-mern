export interface SubCategoryInitialState {
  loading: boolean;
  subCategories: SubCategory[];
}
export type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateSubCategoryAction = {
  type: "CREATE_SUB_CATEGORY";
  payload: { subCategory: SubCategory };
};

export type ReadSubCategory = {
  type: "READ_SUB_CATEGORY";
  payload: {
    subCategory: SubCategory;
  };
};

export type UpdateSubCategory = {
  type: "UPDATE_SUB_CATEGORY";
  payload: {
    prevslug: slug;
    updatedSubCategory: SubCategory;
  };
};

export type DeleteSubCategory = {
  type: "DELETE_SUB_CATEGORY";
  payload: {
    subCategory: SubCategory;
  };
};

export type FetchAllSubCategories = {
  type: "FETCH_ALL_SUB_CATEGORIES";
  payload: {
    subCategories: SubCategory[];
  };
};

export type LoadingSubCategoryAction = {
  type: "LOADING_SUB_CATEGORY";
  payload: {
    loading: boolean;
  };
};

export type SubCategoryReducerActionTypes =
  | CreateSubCategoryAction
  | ReadSubCategory
  | UpdateSubCategory
  | DeleteSubCategory
  | FetchAllSubCategories
  | LoadingSubCategoryAction;
