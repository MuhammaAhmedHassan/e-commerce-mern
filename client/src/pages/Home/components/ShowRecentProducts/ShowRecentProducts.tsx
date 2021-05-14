import { useSelector } from "react-redux";
import { Row, Col, Typography, List } from "antd";
import { RootState } from "../../../../const/types";
import AverageStarRating from "../../../../shared/components/AverageStarRating";
import Spinner from "../../../../shared/components/Spinner";
import { ProductCard } from "../../../../shared/components/ProductCard/ProductCard";

const { Title } = Typography;

function ShowRecentProducts() {
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

export default ShowRecentProducts;
