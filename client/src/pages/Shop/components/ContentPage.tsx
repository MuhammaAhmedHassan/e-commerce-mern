import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteChildrenProps } from "react-router-dom";
import { Row, Col, List } from "antd";
import qs from "querystring";
import {
  readPaginatedShopPageFilteredProducts,
  readPaginatedShopPageProducts,
  readProductsPerPage,
} from "../../../redux/actions/product.action";
import { ProductCard } from "../../../shared/components/ProductCard/ProductCard";
import AverageStarRating from "../../../shared/components/AverageStarRating";
import { RootState } from "../../../const/types";

export function ContentPage(props: RouteChildrenProps) {
  const dispatch = useDispatch();
  const { location } = props;
  const { search } = location;
  const { query, min, max, categoryIds } = qs.parse(search.split("?").pop()!);

  const { loading, products, totalProducts, hasMore } = useSelector(
    ({ product }: RootState) => ({
      products: product.shopPage,
      loading: product.loading,
      totalProducts: product.totalShopPageProducts,
      hasMore:
        product.shopPageProductsPageNumber * 10 < product.totalShopPageProducts,
    })
  );
  const [productsLimit] = useState(10);

  useEffect(() => {
    if (query) return;
    dispatch(
      readPaginatedShopPageProducts({
        limit: productsLimit,
        page: 1,
        sort: "createdAt",
      })
    );
    return () => {};
  }, [query]);

  useEffect(() => {
    // if (!query && !min && !max && !categoryIds) return;
    let _catIds: string[] = [];
    if (categoryIds)
      _catIds = (categoryIds as string)
        .split(",")
        .filter((c) => c.trim() !== "");
    dispatch(
      readPaginatedShopPageFilteredProducts({
        page: 1,
        limit: 10,
        sort: "createdAt",
        query: query as string,
        min: min as string,
        max: max as string,
        categoriesIds: (categoryIds as string)
          ?.split(",")
          ?.filter((c) => c.trim() !== ""),
      })
    );
    return () => {};
  }, [query, min, max, categoryIds]);

  const handlePagination = (page: number) => {
    if (query) {
      dispatch(
        readPaginatedShopPageFilteredProducts({
          page,
          limit: 10,
          sort: "createdAt",
          query: query as string,
          min: min as string,
          max: max as string,
        })
      );
    } else
      dispatch(
        readPaginatedShopPageProducts({
          page,
          limit: productsLimit,
          sort: "createdAt",
        })
      );
  };

  return (
    <Row align="middle" justify="center" className="mt-1">
      <Col>
        <List
          grid={{ gutter: 16 }}
          dataSource={Object.values(products)}
          size="large"
          pagination={{
            total: totalProducts,
            pageSize: 10,
            onChange: handlePagination,
            position: "bottom",
          }}
          className="product-list"
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
          {/* {loading && hasMore && (
        <div className="demo-loading-container">
          <Spinner />
        </div>
      )} */}
        </List>
      </Col>
    </Row>
  );
}
