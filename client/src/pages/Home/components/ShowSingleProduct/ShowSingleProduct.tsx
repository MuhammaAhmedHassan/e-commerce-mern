import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../const/types";
import ShowProduct from "../ShowProduct";

type ParamsType = {
  productCategory: string;
  productId: string;
  productSlug: string;
};

// The purpose of this component is to find which
// type of product we're displaying, e.g., new-arrivals,
// best-sellers or recent products
function ShowSingleProduct(props: RouteComponentProps) {
  const { match, history, location } = props;
  const { params } = match;
  let { productCategory, productId, productSlug } = params as ParamsType;

  const { product, user } = useSelector(({ product, user }: RootState) => ({
    product: product.bestSellers[productId] || product.newArrivals[productId],
    user: user,
  }));

  useEffect(() => {
    if (!product) {
      // then send request to backend for product
    }
  }, []);

  useEffect(() => {
    if (product) {
      // then send request to backend for related products
    }
  }, []);

  if (!product) return null;

  return <ShowProduct {...props} />;
}

export default ShowSingleProduct;
