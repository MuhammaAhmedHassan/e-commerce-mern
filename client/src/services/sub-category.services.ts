import axios from "axios";
import { subCategoryApiRoutes } from "../const/apiRoutes";
import { AppLocalStorage } from "../utils/AppLocalStorage";

export class SubCategoryServices {
  static idToken = () => AppLocalStorage.getItem("USER_AUTH_TOKEN");
  static role = () => AppLocalStorage.getItem("USER_ROLE");

  static getHeaders() {
    return {
      headers: {
        authorization: SubCategoryServices.idToken(),
      },
    };
  }

  static async readCategory(parentCategoryId: string, slug: string) {
    const url = subCategoryApiRoutes.read
      .replace("${parentCategory}", parentCategoryId)
      .replace("${slug}", slug);

    return await axios(url, SubCategoryServices.getHeaders());
  }

  static async updateCategory(
    parentCategoryId: string,
    slug: string,
    updatedName: string
  ) {
    const url = subCategoryApiRoutes.update
      .replace("${parentCategoryId}", parentCategoryId)
      .replace("${slug}", slug);

    return await axios.put(
      url,
      { name: updatedName },
      SubCategoryServices.getHeaders()
    );
  }

  static async createCategory(parentCategoryId: string, name: string) {
    const url = subCategoryApiRoutes.create.replace(
      "${parentCategoryId}",
      parentCategoryId
    );
    return await axios.post(url, { name }, SubCategoryServices.getHeaders());
  }

  static async deleteCategory(parentCategoryId: string, slug: string) {
    const url = subCategoryApiRoutes.delete
      .replace("${parentCategoryId}", parentCategoryId)
      .replace("${slug}", slug);
    return await axios.delete(url, SubCategoryServices.getHeaders());
  }

  static async getCategoriesPerPage(page: number) {}

  static async getAllCategories() {
    const url = subCategoryApiRoutes.getAll;
    return await axios(url, SubCategoryServices.getHeaders());
  }
}
