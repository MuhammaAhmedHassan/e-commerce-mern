import React from "react";
import "./CategoryList.less";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, Divider } from "antd";
import { RootState } from "../../../../../../const/types";
import { fetchCategories } from "../../../../../../redux/actions/category.action";
import { generalRoutes } from "../../../../../../const/routes";

function CategoryList() {
  const dispatch = useDispatch();
  const { categories } = useSelector(({ category }: RootState) => ({
    categories: category.categories,
  }));

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!categories) return null;

  return (
    <div>
      <Divider orientation="center">Categories</Divider>
      <div className="categories-container">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={categories}
          renderItem={(item) => (
            <Link
              to={generalRoutes.Category.replace(
                ":categorySlug",
                item.slug
              ).replace(":categoryId", item._id)}
            >
              <List.Item className="list-item">{item.name}</List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  );
}

export default CategoryList;
