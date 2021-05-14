import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Typography, Row, Col } from "antd";
import { RootState } from "../../../../../../const/types";
import { readHomePageProducts } from "../../../../../../redux/actions/product.action";
import Spinner from "../../../../../../shared/components/Spinner";
import AverageStarRating from "../../../../../../shared/components/AverageStarRating";
import { ProductCard } from "../../../../../../shared/components/ProductCard/ProductCard";

const { Title } = Typography;

function NewArrivals() {
  const dispatch = useDispatch();
  const { newArrivals, loading, totalProducts, hasMore } = useSelector(
    ({ product }: RootState) => ({
      newArrivals: product.newArrivals,
      pageNumber: product.pageNumber,
      loading: product.loading,
      totalProducts: product.totalProducts,
      hasMore: product.pageNumber * 10 < product.totalProducts,
    })
  );
  const [newArrivalsLimit] = useState(3);

  useEffect(() => {
    dispatch(readHomePageProducts({ page: 1, limit: 3, sort: "createdAt" }));
    return () => {};
  }, []);

  const handlePagination = (page: number) => {
    const lastPage = page * newArrivalsLimit >= totalProducts;
    const newArrivalsLength = Object.keys(newArrivals).length;

    let stopReSendingRequestForTheLastPage: boolean = false;
    if (lastPage) {
      stopReSendingRequestForTheLastPage =
        newArrivalsLength > (page - 1) * newArrivalsLimit &&
        newArrivalsLength < page * newArrivalsLimit;
    }

    if (page * newArrivalsLimit <= newArrivalsLength) return;
    if (stopReSendingRequestForTheLastPage) return;

    dispatch(
      readHomePageProducts({ page, limit: newArrivalsLimit, sort: "createdAt" })
    );
  };

  return (
    <div>
      <Row align="middle" justify="center" className="mt-1">
        <Title level={1}>Recent Arrives</Title>
      </Row>
      <Row align="middle" justify="center" className="mt-1">
        <Col>
          <List
            grid={{ gutter: 16 }}
            dataSource={Object.values(newArrivals)}
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
            {loading && hasMore && (
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

export default memo(NewArrivals);
