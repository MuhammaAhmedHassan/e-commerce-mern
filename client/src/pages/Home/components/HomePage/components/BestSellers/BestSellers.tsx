import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { List, Row, Col, Typography, Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../const/types";
import { readHomePageProducts } from "../../../../../../redux/actions/product.action";
import Spinner from "../../../../../../shared/components/Spinner";
import { generalRoutes } from "../../../../../../const/routes";
import AverageStarRating from "../../../AverageStarRating";

const { Paragraph, Title } = Typography;

function BestSellers() {
  const dispatch = useDispatch();
  const { bestSellers, loading, totalProducts, hasMore } = useSelector(
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
                    <Card
                      className="product-card"
                      cover={
                        <img
                          alt="example"
                          src={
                            item.images?.length
                              ? item.images[0].url
                              : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          }
                        />
                      }
                      actions={[
                        <Link
                          to={generalRoutes.BEST_SELLERS.replace(
                            ":productId",
                            item._id
                          ).replace(":productSlug", item.slug)}
                        >
                          <EyeOutlined key="eye-outlined" />
                        </Link>,
                        <ShoppingCartOutlined key="shopping-cart" />,
                      ]}
                    >
                      <Card.Meta
                        title={item.title}
                        description={
                          <Paragraph ellipsis={true}>
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
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
