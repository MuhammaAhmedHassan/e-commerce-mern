import { useState, useEffect, memo } from "react";
import { List, Row, Col, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../const/types";
import { readHomePageProducts } from "../../../../../../redux/actions/product.action";
import AverageStarRating from "../../../../../../shared/components/AverageStarRating";
import { ProductCard } from "../../../../../../shared/components/ProductCard/ProductCard";

const { Title } = Typography;

function BestSellers() {
  const dispatch = useDispatch();
  const { bestSellers, totalProducts } = useSelector(
    ({ product }: RootState) => ({
      bestSellers: product.bestSellers,
      loading: product.loading,
      totalProducts: product.totalProducts,
      hasMore: product.pageNumber * 10 < product.totalProducts,
    })
  );
  const [bestSellersLimit] = useState(3);
  useEffect(() => {
    dispatch(readHomePageProducts({ page: 1, limit: 3, sort: "sold" }));
    return () => {};
  }, []);

  const handlePagination = (page: number) => {
    const lastPage = page * bestSellersLimit >= totalProducts;
    const bestSellersLength = Object.keys(bestSellers).length;

    let stopReSendingRequestForTheLastPage: boolean = false;
    if (lastPage) {
      stopReSendingRequestForTheLastPage =
        bestSellersLength > (page - 1) * bestSellersLimit &&
        bestSellersLength < page * bestSellersLimit;
    }

    if (page * bestSellersLimit <= bestSellersLength) return;
    if (stopReSendingRequestForTheLastPage) return;

    dispatch(
      readHomePageProducts({ page, limit: bestSellersLimit, sort: "sold" })
    );
  };

  return (
    <div>
      <Row align="middle" justify="center" className="mt-1">
        <Title level={1}>Best Sellers</Title>
      </Row>
      <Row align="middle" justify="center" className="mt-1">
        <Col>
          <List
            grid={{ gutter: 16 }}
            dataSource={Object.values(bestSellers)}
            size="large"
            pagination={{
              total: totalProducts,
              pageSize: 3,
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
    </div>
  );
}

export default memo(BestSellers);
