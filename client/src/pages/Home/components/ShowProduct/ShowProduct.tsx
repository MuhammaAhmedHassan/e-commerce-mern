import { useEffect, useState } from "react";
import "./ShowProduct.less";
import { RouteComponentProps, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Card, Carousel, Image, Typography, Badge, Tabs } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import StarRating from "react-star-ratings";
import { RatingModal } from "../";
import { RootState } from "../../../../const/types";
import { SubCategory } from "../../../../const/types/sub-category";
import { onBoardingRoutes } from "../../../../const/routes";

const { TabPane } = Tabs;

const { Title } = Typography;

type ParamsType = {
  productCategory: string;
  productId: string;
  productSlug: string;
};

function ShowProduct(props: RouteComponentProps) {
  const { match, history, location } = props;
  const { params } = match;
  let { productCategory, productId, productSlug } = params as ParamsType;

  const { product, user } = useSelector(({ product, user }: RootState) => ({
    product: product.bestSellers[productId] || product.newArrivals[productId],
    user: user,
  }));

  const [showRatingModal, setShowRatingModal] = useState(false);

  console.log("userId", user._id);
  const handleRating = () => {
    if (user._id) {
      setShowRatingModal(true);
    } else {
      history.push(onBoardingRoutes.LOGIN, { from: location.pathname });
      return;
      // Another way
      history.push({
        pathname: onBoardingRoutes.LOGIN,
        state: { from: location.pathname },
      });
    }
  };

  if (!product) return null;

  return (
    <div>
      <Row align="middle" justify="center" className="mt-2">
        <Col>
          <Title level={1}>{product.title}</Title>
        </Col>
      </Row>
      <Row style={{ overflow: "hidden", boxSizing: "border-box" }}>
        <Col span={14} className="slider-container">
          <Carousel effect="fade" infinite dots>
            {product.images.map((img) => (
              <div key={img.imageId}>
                <Image
                  src={img.url}
                  width={500}
                  className="product-img"
                  alt={"product-images"}
                />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col span={10}>
          {showRatingModal && (
            <RatingModal
              visible={showRatingModal}
              changeRating={() => {}}
              name={product._id}
              rating={3}
              onCancel={() => setShowRatingModal(false)}
            />
          )}
          <Card
            title="Product Detail"
            className="product-details-card"
            actions={[
              <span key="shopping cart">
                <ShoppingCartOutlined /> <br />
                Add to cart
              </span>,
              <span key="add to whishlist">
                <HeartOutlined />
                <br />
                Add to wishlist
              </span>,
              <span key="add rating" role="button" onClick={handleRating}>
                <StarOutlined />
                <br />
                {user._id ? "Leave rating" : "Login to leave rating"}
              </span>,
            ]}
          >
            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Name</span>
              <span>{product.title}</span>
            </Row>
            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Price</span>
              <span>${product.price}</span>
            </Row>

            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Category</span>
              <Link to={"/"}>{product.category.name}</Link>
            </Row>

            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Sub Categories</span>
              {(product.subCategories as SubCategory[]).map((s) => (
                <Badge
                  key={s._id}
                  className="site-badge-count-109"
                  count={s.name}
                  style={{ backgroundColor: "#52c41a" }}
                />
              ))}
            </Row>

            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Color</span>
              <span>{product.color}</span>
            </Row>

            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Shipping</span>
              <span>{product.shipping}</span>
            </Row>

            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Available</span>
              <span>{product.quantity}</span>
            </Row>

            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Sold</span>
              <span>{product.sold}</span>
            </Row>

            <Row
              align="middle"
              justify="space-between"
              className="product-details-item"
            >
              <span>Brand</span>
              <span>{product.brand}</span>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col offset={2}>
          <Tabs defaultActiveKey="description">
            <TabPane tab="Description" key="description">
              {product.description}
            </TabPane>
            <TabPane tab="More information" key="more_information">
              Call use to xxxx xxx xxx x to learn more about this product
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default ShowProduct;
