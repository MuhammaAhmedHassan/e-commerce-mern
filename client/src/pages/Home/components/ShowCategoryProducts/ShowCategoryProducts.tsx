import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, List } from "antd";
import { getCategoryProducts } from "../../../../redux/actions/product.action";
import { RootState } from "../../../../const/types";
import AverageStarRating from "../../../../shared/components/AverageStarRating";
import { ProductCard } from "../../../../shared/components/ProductCard/ProductCard";
import Spinner from "../../../../shared/components/Spinner";
import { fetchCategories } from "../../../../redux/actions/category.action";

const { Title } = Typography;

export function ShowCategoryProducts(props: RouteComponentProps) {
  const { match } = props;
  const { params } = match;
  const { categoryId } = params as { categoryId: string; categorySlug: string };
  const dispatch = useDispatch();
  const { loading, products, totalProducts, category } = useSelector(
    ({ product, category }: RootState) => ({
      products: product.categoryProducts,
      loading: product.loading,
      totalProducts: product.totalCategoryProducts,
      category: category.categories.find((c) => c._id === categoryId),
    })
  );
  const [cateogoryProductsLimit] = useState(10);

  useEffect(() => {
    dispatch(getCategoryProducts(categoryId));
  }, []);

  useEffect(() => {
    if (!category) dispatch(fetchCategories());
  }, [category]);

  const handlePagination = (page: number) => {
    const lastPage = page * cateogoryProductsLimit >= totalProducts;
    const newArrivalsLength = Object.keys(products).length;

    let stopReSendingRequestForTheLastPage: boolean = false;
    if (lastPage) {
      stopReSendingRequestForTheLastPage =
        newArrivalsLength > (page - 1) * cateogoryProductsLimit &&
        newArrivalsLength < page * cateogoryProductsLimit;
    }

    if (page * cateogoryProductsLimit <= newArrivalsLength) return;
    if (stopReSendingRequestForTheLastPage) return;

    dispatch(getCategoryProducts(categoryId, page));
  };

  return (
    <div>
      <Row align="middle" justify="center" className="mt-1">
        <Title level={1}>{category?.name}'s Products</Title>
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
