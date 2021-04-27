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
  read,
  update,
  getAll,
  delete: deleteProduct,
  readPerPage,
  testBestSellers,
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

  static async deleteProduct(productId: string) {
    const url = deleteProduct.replace("${productId}", productId);
    return await HTTP.delete(url);
  }
}
