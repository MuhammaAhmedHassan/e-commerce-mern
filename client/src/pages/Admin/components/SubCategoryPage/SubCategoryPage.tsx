import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ListSubCategories from "../ListSubCategories";
import SubCategoryForm from "../SubCategoryForm";

function SubCategoryPage(props: RouteComponentProps) {
  return (
    <div>
      <SubCategoryForm {...props} />
      <ListSubCategories />
    </div>
  );
}

export default SubCategoryPage;
