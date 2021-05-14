import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, List } from "antd";
import {
  getCategoryProducts,
  getSubCategoryProducts,
} from "../../../../redux/actions/product.action";
import { RootState } from "../../../../const/types";
import AverageStarRating from "../../../../shared/components/AverageStarRating";
import { ProductCard } from "../../../../shared/components/ProductCard/ProductCard";
import Spinner from "../../../../shared/components/Spinner";
import { fetchCategories } from "../../../../redux/actions/category.action";

const { Title } = Typography;

export function ShowSubCategoryProducts(props: RouteComponentProps) {
  const { match } = props;
  const { params } = match;
  const { subCategoryId } = params as {
    subCategoryId: string;
    subCategorySlug: string;
  };
  const dispatch = useDispatch();
  const { loading, products, totalProducts, subCategory } = useSelector(
    ({ product, subCategory }: RootState) => ({
      products: product.subCategoryProducts,
      loading: product.loading,
      totalProducts: product.totalSubCategoryProducts,
      subCategory: subCategory.subCategories.find(
        (s) => s._id === subCategoryId
      ),
    })
  );
  const [subCateogoryProductsLimit] = useState(10);

  useEffect(() => {
    dispatch(getSubCategoryProducts(subCategoryId));
  }, []);

  useEffect(() => {
    if (!subCategory) dispatch(fetchCategories());
  }, [subCategory]);

  const handlePagination = (page: number) => {
    const lastPage = page * subCateogoryProductsLimit >= totalProducts;
    const newArrivalsLength = Object.keys(products).length;

    let stopReSendingRequestForTheLastPage: boolean = false;
    if (lastPage) {
      stopReSendingRequestForTheLastPage =
        newArrivalsLength > (page - 1) * subCateogoryProductsLimit &&
        newArrivalsLength < page * subCateogoryProductsLimit;
    }

    if (page * subCateogoryProductsLimit <= newArrivalsLength) return;
    if (stopReSendingRequestForTheLastPage) return;

    dispatch(getCategoryProducts(subCategoryId, page));
  };

  return (
    <div>
      <Row align="middle" justify="center" className="mt-1">
        <Title level={1}>{subCategory?.name}'s Products</Title>
      </Row>
      <Row align="middle" justify="center" className="mt-1">
        <Col>
          <List
            grid={{ gutter: 16 }}
            dataSource={Object.values(products)}
            size="large"
            className="product-list"
            pagination={{
              total: totalProducts,
              pageSize: 3,
              onChange: handlePagination,
              position: "bottom",
            }}
            renderItem={(item) => {
              return (
                <Col key={item._id}>
                  <List.Item>
                    <AverageStarRating product={item} />
                    <ProductCard product={item} />
                  </List.Item>
                </Col>
              );
            }}
          >
            {loading && (
              <div className="demo-loading-container">
                <Spinner />
              </div>
            )}
          </List>
        </Col>
      </Row>
    </div>
  );
}
