import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Product } from "../../../const/types/product";
import { generalRoutes } from "../../../const/routes";

const { Paragraph } = Typography;

interface Props {
  product: Product;
}

export function ProductCard(props: Props) {
  const { product } = props;
  return (
    <Card
      className="product-card"
      cover={
        <img
          alt="example"
          src={
            product.images?.length
              ? product.images[0].url
              : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
        />
      }
      actions={[
        <Link
          to={generalRoutes.PRODUCT_PAGE.replace(
            ":productId",
            product._id
          ).replace(":productSlug", product.slug)}
        >
          <EyeOutlined key="eye-outlined" />
        </Link>,
        <ShoppingCartOutlined key="shopping-cart" />,
      ]}
    >
      <Card.Meta
        title={product.title + ` - $${product.price}`}
        description={
          <Paragraph ellipsis={true}>{product.description}</Paragraph>
        }
      />
    </Card>
  );
}
