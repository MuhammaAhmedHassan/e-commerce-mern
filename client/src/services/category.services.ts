import axios from "axios";
import { categoryApiRoutes } from "../const/apiRoutes";
import { AppLocalStorage } from "../utils/AppLocalStorage";

export class CategoryServices {
  static idToken = () => AppLocalStorage.getItem("USER_AUTH_TOKEN");
  static role = () => AppLocalStorage.getItem("USER_ROLE");

  static getHeaders() {
    return {
      headers: {
        authorization: CategoryServices.idToken(),
      },
    };
  }

  static async readCategory(slug: string) {
    const url = categoryApiRoutes.read.replace("${slug}", slug);
    return await axios(url, CategoryServices.getHeaders());
  }

  static async updateCategory(name: string) {}

  static async createCategory(name: string) {
    const url = categoryApiRoutes.create;
    return await axios.post(url, { name }, CategoryServices.getHeaders());
  }

  static async deleteCategory(slug: string) {
    const url = categoryApiRoutes.delete.replace("${slug}", slug);
    return await axios.delete(url, CategoryServices.getHeaders());
  }

  static async getCategoriesPerPage(page: number) {}

  static async getAllCategories() {
    const url = categoryApiRoutes.getAll;
    return await axios(url, CategoryServices.getHeaders());
  }
}
