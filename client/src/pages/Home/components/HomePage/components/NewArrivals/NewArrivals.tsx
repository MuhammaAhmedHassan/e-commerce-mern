import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, Card, Typography, Row, Col } from "antd";
import { RootState } from "../../../../../../const/types";
import { readHomePageProducts } from "../../../../../../redux/actions/product.action";
import Spinner from "../../../../../../shared/components/Spinner";
import { generalRoutes } from "../../../../../../const/routes";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Paragraph, Title } = Typography;

function NewArrivals() {
  const dispatch = useDispatch();
  const {
    newArrivals,
    pageNumber,
    loading,
    totalProducts,
    hasMore,
  } = useSelector(({ product }: RootState) => ({
    newArrivals: product.newArrivals,
    pageNumber: product.pageNumber,
    loading: product.loading,
    totalProducts: product.totalProducts,
    hasMore: product.pageNumber * 10 < product.totalProducts,
  }));
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
                <Col>
                  <List.Item>
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
                          to={generalRoutes.NEW_ARRIVALS.replace(
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
