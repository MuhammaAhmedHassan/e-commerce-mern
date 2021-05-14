import React from "react";
import "./SubCategoryList.less";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, Divider } from "antd";
import { RootState } from "../../../../../../const/types";
import { fetchSubCategories } from "../../../../../../redux/actions/sub-category.action";
import { generalRoutes } from "../../../../../../const/routes";

function SubCategoryList() {
  const dispatch = useDispatch();
  const { subCategories } = useSelector(({ subCategory }: RootState) => ({
    subCategories: subCategory.subCategories,
  }));

  React.useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  if (!subCategories) return null;

  return (
    <div>
      <Divider orientation="center">Sub Categories</Divider>
      <div className="categories-container">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={subCategories}
          renderItem={(item) => (
            <Link
              to={generalRoutes.SubCategory.replace(
                ":subCategoryId",
                item._id
              ).replace(":subCategorySlug", item.slug)}
            >
              <List.Item className="list-item">{item.name}</List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  );
}

export default SubCategoryList;
