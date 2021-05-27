import { LeanDocument } from "mongoose";
import { Product, ProductDoc } from "../models/product.model";

/** @Func getProductsWithOutPopulating @return Product[] */
/** @Func getProductsBasedOnCategory @return Product[] + category */

export const getPaginatedProducts = (options: {
  limit: number;
  skip: number;
}) => {
  const { limit, skip } = options;
  return Product.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean()
    .exec();
};

export const getProductsBasedOnCategory = (categoryId: string) => {
  return Product.find({ category: categoryId })
    .populate("category")
    .sort({ createdAt: -1 })
    .lean()
    .exec();
};

export const getProductsBasedOnSubCategory = (
  subCategoryId: string | string[]
) => {
  return Product.find({ subCategories: subCategoryId })
    .populate("subcategories")
    .lean()
    .exec();
};

export const getProductsBasedOnMinAndMaxValue = ({
  min,
  max,
}: {
  min: number;
  max: number;
}) => {
  return Product.find({ min: min ?? 0, max: max ?? Number.MAX_SAFE_INTEGER })
    .lean()
    .exec();
};

export const reduceFilteredProductsBasedOnMinAndMaxValue = (options: {
  products: LeanDocument<ProductDoc>[];
  min: number;
  max: number;
}) => {
  const { products, min, max } = options;
  return products.filter(
    (p) => p.price >= min ?? (0 && p.price <= max) ?? Number.MAX_SAFE_INTEGER
  );
};

/** @Func Get Products Based On Text Query  */
export const getProductsBasedOnTextQuery = (options: {
  keywords: string;
  limit: number;
  skip: number;
}) => {
  const { keywords, limit, skip } = options;
  return (
    Product.find({ $text: { $search: keywords } })
      // .populate("category", "_id name")
      // .populate("subcategories", "_id name")
      // .populate("postedBy", "_id name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean()
      .exec()
  );
};
