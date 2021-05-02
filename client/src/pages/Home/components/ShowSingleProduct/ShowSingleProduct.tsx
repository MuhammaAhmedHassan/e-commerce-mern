import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../const/types";
import ShowProduct from "../ShowProduct";
import {
  fetchRelatedProduct,
  fetchSingleProduct,
} from "../../../../redux/actions/product.action";
import { ShowRecentProducts } from "..";

type ParamsType = {
  productCategory: string;
  productId: string;
  productSlug: string;
};

// The purpose of this component is to find which
// type of product we're displaying, e.g., new-arrivals,
// best-sellers or recent products
function ShowSingleProduct(props: RouteComponentProps) {
  const { match } = props;
  const { params } = match;
  let { productCategory, productId, productSlug } = params as ParamsType;

  const dispatch = useDispatch();
  const { product } = useSelector(({ product, user }: RootState) => ({
    product:
      product.bestSellers[productId] ||
      product.newArrivals[productId] ||
      product.singleProduct,
    user: user,
  }));

  useEffect(() => {
    // then send request to backend for the product
    dispatch(fetchSingleProduct(productId));
    return () => {};
  }, [productId]);

  useEffect(() => {
    if (product) {
      // then send request to backend for related products
      dispatch(fetchRelatedProduct(product._id));
    }
  }, [product]);

  if (!product) return null;

  return (
    <>
      <ShowProduct
        {...props}
        product={product}
        productCategory={productCategory}
      />
      <ShowRecentProducts />
    </>
  );
}

export default ShowSingleProduct;
