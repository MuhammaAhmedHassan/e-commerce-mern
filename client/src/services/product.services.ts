import axios from "axios";
import { productApiRoutes } from "../const/apiRoutes";
import {
  Product,
  ProductFormValues,
  ResponseImageType,
} from "../const/types/product";
import { HTTP } from "../utils/Http";

// delete: deleteProduct maybe because 'delete' is a reserve word
const {
  create,
  readSingleProduct,
  update,
  getAll,
  delete: deleteProduct,
  readPerPage,
  updateRating,
  relatedProducts,
  getCategoryProducts,
  getSubCategoryProducts,
} = productApiRoutes;

export class ProductServices {
  static async createProduct(product: ProductFormValues) {
    return await HTTP.post(create, { ...product });
  }

  static async readAllProducts() {
    return await HTTP(getAll);
  }

  static async readProductsPerPage(page: number = 1, limit: number = 3) {
    const url = readPerPage + `?page=${page}&limit=${limit}`;
    return await HTTP(url);
  }

  static async readHomePageProducts(options: {
    page: number;
    limit: number;
    sort: "createdAt" | "sold";
  }) {
    const { page, limit, sort } = options;
    const url = readPerPage + `?page=${page}&limit=${limit}&sort=${sort}`;
    return await HTTP(url);
  }

  static async updateProduct(product: ProductFormValues, id: string) {
    const url = update.replace("${productId}", id);
    return await HTTP.put(url, product);
  }

  static async updateProductRating(options: {
    star: number;
    productId: string;
  }) {
    const { star, productId } = options;
    const url = updateRating.replace("${productId}", productId);
    return await HTTP.put(url, { star });
  }

  static async fetchSingleProduct(productId: string) {
    const url = readSingleProduct.replace("${productId}", productId);
    return await HTTP.get(url);
  }

  static async fetchRelatedProducts(productId: string) {
    const url = relatedProducts.replace("${productId}", productId);
    return await HTTP.get(url);
  }

  static async deleteProduct(productId: string) {
    const url = deleteProduct.replace("${productId}", productId);
    return await HTTP.delete(url);
  }

  static async getCategoryProducts(options: {
    categoryId: string;
    page: number;
    limit: number;
  }) {
    const { categoryId, page, limit } = options;
    const url = getCategoryProducts.replace(":categoryId", categoryId);
    return HTTP(url + `?page=${page}&limit=${limit}`);
  }

  static async getSubCategoryProducts(options: {
    subCategoryId: string;
    page: number;
    limit: number;
  }) {
    const { subCategoryId, page, limit } = options;
    const url = getSubCategoryProducts.replace(":subCategoryId", subCategoryId);
    return HTTP(url + `?page=${page}&limit=${limit}`);
  }
}
