import { memo } from "react";
import StarRating from "react-star-ratings";
import { Product } from "../../../../const/types/product";
import { Typography, Row } from "antd";

const { Paragraph } = Typography;

interface Props {
  product: Product;
}

function AverageStarRating(props: Props) {
  const { product } = props;
  if (!product) return null;
  const averageRatingOfProduct =
    product?.ratings?.reduce((prv, { star }) => prv + star, 0) /
      product?.ratings?.length || 0;

  console.count("How many times I render");

  return (
    <Row align="middle" justify="center">
      {Array.isArray(product?.ratings) ? (
        <>
          <StarRating
            rating={averageRatingOfProduct}
            starRatedColor="teal"
            numberOfStars={5}
            isSelectable={false}
            starDimension={"18px"}
            starSpacing={"2px"}
            editing={false}
          />
          <span
            style={{ color: "teal" }}
            title="Total users who rated this product"
            className=""
          >
            &nbsp; ({product?.ratings?.length})
          </span>
        </>
      ) : (
        <Paragraph style={{ color: "teal" }}>No rating yet</Paragraph>
      )}
    </Row>
  );
}

export default memo(AverageStarRating);
