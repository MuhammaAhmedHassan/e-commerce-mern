import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, List, Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { RootState } from "../../../../const/types";
import AverageStarRating from "../AverageStarRating";
import Spinner from "../../../../shared/components/Spinner";
import { generalRoutes } from "../../../../const/routes";

const { Title, Paragraph } = Typography;

function ShowRecentProducts() {
  const dispatch = useDispatch();
  const { relatedProducts, loading } = useSelector(
    ({ product }: RootState) => ({
      relatedProducts: product.relatedProducts,
      loading: product.loading,
    })
  );

  return (
    <div>
      <Row align="middle" justify="center" className="mt-1">
        <Title level={1}>Related Products</Title>
      </Row>
      <Row align="middle" justify="center" className="mt-1">
        <Col>
          <List
            grid={{ gutter: 16 }}
            dataSource={Object.values(relatedProducts)}
            size="large"
            pagination={undefined}
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
                          to={generalRoutes.RELATED_PRODUCTS.replace(
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

export default ShowRecentProducts;
