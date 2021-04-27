import { CategoryType } from ".";
import { SubCategory } from "./sub-category";

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: CategoryType;
  subCategories: string[] | SubCategory[];
  quantity: number;
  sold: number;
  images: ResponseImageType[];
  shipping: "Yes" | "No";
  color: "Black" | "Brown" | "Silver" | "White" | "Blue";
  brand: "Apple" | "Samsung" | "Microsoft" | "Lenovo" | "ASUS";
  ratings: {
    star: number;
    postedBy: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ResponseImageType {
  imageId: string;
  url: string;
}

export interface ProductFormValues {
  title: string;
  description: string;
  price: string;
  category: string;
  subCategories: string[];
  shipping: string;
  quantity: string;
  images:
    | { originFileObj: File }[] // required for new images
    | { name: string; uid: string; url: string }[] // {name, uid, url} is required for prv images
    | string[]; // string[] is required to send to the server
  removedImages?: string[];
  color: string;
  brand: string;
}

export interface ProductInitialState {
  loading: boolean;
  productsPerPage: { [key: string]: Product };
  newArrivals: { [key: string]: Product };
  bestSellers: { [key: string]: Product };
  bestSellersPageNumber: number;
  pageNumber: number;
  totalProducts: number;
}

export type ProductLoading = {
  type: "PRODUCT_LOADING";
  payload: { loading: boolean };
};

export type CreateProduct = {
  type: "CREATE_PRODUCT";
  payload: {
    product: Product;
  };
};

export type ReadProduct = {
  type: "READ_PRODUCT";
  payload: {
    product: Product;
  };
};

export type ReadAllProducts = {
  type: "READ_ALL_PRODUCTS";
  payload: {
    products: Product[];
  };
};

export type ReadProductsPerPage = {
  type: "READ_PRODUCTS_PER_PAGE";
  payload: {
    products: Product[];
    total: number;
    page: number;
  };
};

export type HomePageProductsNewArrivals = {
  type: "READ_NEW_ARRIVALS_PER_PAGE";
  payload: {
    products: Product[];
    total: number;
    page: number;
  };
};

export type HomePageProductsBestSellers = {
  type: "READ_BEST_SELLERS_PER_PAGE";
  payload: {
    products: Product[];
    total: number;
    page: number;
  };
};

export type DeleteProduct = {
  type: "DELETE_PRODUCT";
  payload: {
    productId: string;
  };
};

export type UpdateProduct = {
  type: "UPDATE_PRODUCT";
  payload: {
    product: Product;
  };
};

export type ProductActionTypes =
  | ProductLoading
  | CreateProduct
  | ReadProduct
  | ReadAllProducts
  | ReadProductsPerPage
  | HomePageProductsBestSellers
  | HomePageProductsNewArrivals
  | DeleteProduct
  | UpdateProduct;
