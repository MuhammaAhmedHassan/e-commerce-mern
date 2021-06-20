import { ThunkDispatch } from "redux-thunk";
import { printMessage } from "../../const/printMessage";
import { AlertReduxState } from "../../const/types";
import {
  CreateProduct,
  DeleteProduct,
  HomePageProductsNewArrivals,
  HomePageProductsBestSellers,
  Product,
  ProductFormValues,
  ProductLoading,
  ReadAllProducts,
  ReadProductsPerPage,
  UpdateProduct,
  UpdateProductRating,
  FetchSingleProduct,
  FetchRelatedProduct,
  FetchCategoryProducts,
  FetchSubCategoryProducts,
  ShopPagePaginatedProducts,
  ShopPageFilteredPaginatedProducts,
} from "../../const/types/product";
import { ProductServices } from "../../services/product.services";
import { resizeFile } from "../../utils/fileResizer";
import { createAlert, setAlertMessage } from "./alert.action";

let alertMsg: AlertReduxState;

const resizeImages = async (
  images: {
    originFileObj: File;
  }[]
) => {
  // array to store resized images
  const imgs: string[] = [];

  // resizing and converting images to base64
  for (let i = 0; i < images.length; i++) {
    const img = (await resizeFile(images[i].originFileObj)) as string;
    imgs.push(img);
  }

  return imgs;
};

export const productLoading = (loading: boolean): ProductLoading => ({
  type: "PRODUCT_LOADING",
  payload: { loading },
});

export const createProduct =
  (newProduct: ProductFormValues, callback?: () => void) =>
  async (dispatch: ThunkDispatch<{}, {}, CreateProduct | ProductLoading>) => {
    try {
      dispatch(productLoading(true));

      const images = newProduct.images as unknown as {
        originFileObj: File;
      }[];

      // // array to store resized images
      // const imgs: string[] = [];

      // // resizing and converting images to base64
      // for (let i = 0; i < images.length; i++) {
      //   const img = (await resizeFile(images[i].originFileObj)) as string;
      //   imgs.push(img);
      // }

      // newProduct.images = imgs;
      newProduct.images = await resizeImages(images);

      const product = (await ProductServices.createProduct(newProduct))
        .data as Product;

      dispatch({ type: "CREATE_PRODUCT", payload: { product } });
      alertMsg = createAlert(
        "success",
        `Product ${product.title} created successfully.`
      );

      if (callback) callback();
    } catch ({ response }) {
      printMessage("product.action => createProduct()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const readAllProducts =
  () =>
  async (dispatch: ThunkDispatch<{}, {}, ReadAllProducts | ProductLoading>) => {
    try {
      dispatch(productLoading(true));
      const products = (await ProductServices.readAllProducts())
        .data as Product[];

      dispatch({ type: "READ_ALL_PRODUCTS", payload: { products } });
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const readProductsPerPage =
  (page: number = 1) =>
  async (
    dispatch: ThunkDispatch<{}, {}, ReadProductsPerPage | ProductLoading>
  ) => {
    try {
      dispatch(productLoading(true));
      const {
        data,
        page: pageNumber,
        total,
      } = (await ProductServices.readProductsPerPage(page)).data as {
        data: Product[];
        total: number;
        page: number;
      };

      dispatch({
        type: "READ_PRODUCTS_PER_PAGE",
        payload: { products: data, page: pageNumber, total },
      });
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const readHomePageProducts =
  (
    options: { page: number; limit: number; sort: "createdAt" | "sold" },
    callback?: () => void
  ) =>
  async (
    dispatch: ThunkDispatch<
      {},
      {},
      HomePageProductsNewArrivals | HomePageProductsBestSellers | ProductLoading
    >
  ) => {
    try {
      dispatch(productLoading(true));
      const {
        data,
        page: pageNumber,
        total,
      } = (await ProductServices.readHomePageProducts(options)).data as {
        data: Product[];
        total: number;
        page: number;
      };

      if (options.sort === "sold") {
        dispatch({
          type: "READ_BEST_SELLERS_PER_PAGE",
          payload: { products: data, page: pageNumber, total },
        });
      } else {
        dispatch({
          type: "READ_NEW_ARRIVALS_PER_PAGE",
          payload: { products: data, page: pageNumber, total },
        });
      }

      if (callback) callback();
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const readPaginatedShopPageFilteredProducts =
  (
    options: {
      page: number;
      limit: number;
      sort: "createdAt";
      query?: string;
      min?: string;
      max?: string;
      categoriesIds?: string[];
    },
    callback?: () => void
  ) =>
  async (
    dispatch: ThunkDispatch<
      {},
      {},
      ShopPageFilteredPaginatedProducts | ProductLoading
    >
  ) => {
    try {
      dispatch(productLoading(true));
      const {
        data,
        page: pageNumber,
        total,
      } = (await ProductServices.getFilteredProductsPerPage(options)).data as {
        data: Product[];
        total: number;
        page: number;
      };

      dispatch({
        type: "SHOP_PAGE_FILTERED_PAGINATED_PRODUCTS",
        payload: { products: data, page: pageNumber, total },
      });

      if (callback) callback();
    } catch ({ response }) {
      printMessage(
        "product.action => readPaginatedShopPageFilteredProducts()",
        response
      );
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const readPaginatedShopPageProducts =
  (
    options: { page: number; limit: number; sort: "createdAt" },
    callback?: () => void
  ) =>
  async (
    dispatch: ThunkDispatch<{}, {}, ShopPagePaginatedProducts | ProductLoading>
  ) => {
    try {
      dispatch(productLoading(true));
      const {
        data,
        page: pageNumber,
        total,
      } = (await ProductServices.readHomePageProducts(options)).data as {
        data: Product[];
        total: number;
        page: number;
      };

      dispatch({
        type: "SHOP_PAGE_PAGINATED_PRODUCTS",
        payload: { products: data, page: pageNumber, total },
      });

      if (callback) callback();
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const updateProductRating =
  (
    options: {
      star: number;
      productId: string;
      productCategory: string;
    },
    callback?: () => void
  ) =>
  async (
    dispatch: ThunkDispatch<{}, {}, ProductLoading | UpdateProductRating>
  ) => {
    const { productCategory, ...rest } = options;
    try {
      dispatch(productLoading(true));
      const product = (await ProductServices.updateProductRating(rest))
        .data as Product;

      dispatch({
        type: "UPDATE_PRODUCT_RATING",
        payload: { product, productCategory },
      });

      if (callback) callback();
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const fetchSingleProduct =
  (productId: string, callback?: () => void) =>
  async (
    dispatch: ThunkDispatch<{}, {}, ProductLoading | FetchSingleProduct>
  ) => {
    try {
      dispatch(productLoading(true));
      const product = (await ProductServices.fetchSingleProduct(productId))
        .data as Product;

      dispatch({
        type: "FETCH_SINGLE_PRODUCT",
        payload: { product },
      });

      if (callback) callback();
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const fetchRelatedProduct =
  (productId: string, callback?: () => void) =>
  async (
    dispatch: ThunkDispatch<{}, {}, ProductLoading | FetchRelatedProduct>
  ) => {
    try {
      dispatch(productLoading(true));
      const products = (await ProductServices.fetchRelatedProducts(productId))
        .data as Product[];

      dispatch({
        type: "FETCH_RELATED_PRODUCT",
        payload: { products },
      });

      if (callback) callback();
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const updateProduct =
  (productToUpdate: Product, newValues: ProductFormValues) =>
  async (dispatch: ThunkDispatch<{}, {}, UpdateProduct | ProductLoading>) => {
    try {
      dispatch(productLoading(true));

      const {
        newImages,
        removedImages,
        oldImages: _,
      } = reduceImages(productToUpdate, newValues);
      newValues = getProductUpdatedFields(productToUpdate, newValues);
      newValues.images = await resizeImages(newImages);
      newValues.removedImages = removedImages || [];

      const product = (
        await ProductServices.updateProduct(newValues, productToUpdate._id)
      ).data as Product;

      dispatch({ type: "UPDATE_PRODUCT", payload: { product } });
      alertMsg = createAlert(
        "success",
        `Product ${product.title} updated successfully.`
      );
    } catch (error) {
      const { response } = error;
      printMessage("product.action => readAllProducts()", error);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      } else {
        throw new Error(error);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const deleteProduct =
  (product: Product) =>
  async (dispatch: ThunkDispatch<{}, {}, DeleteProduct | ProductLoading>) => {
    try {
      dispatch(productLoading(true));
      await ProductServices.deleteProduct(product._id);

      dispatch({ type: "DELETE_PRODUCT", payload: { productId: product._id } });
      alertMsg = createAlert(
        "success",
        `Product ${product.title} deleted successfully.`
      );
    } catch ({ response }) {
      printMessage("product.action => readAllProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const getCategoryProducts =
  (categoryId: string, page: number = 1) =>
  async (
    dispatch: ThunkDispatch<{}, {}, FetchCategoryProducts | ProductLoading>
  ) => {
    const limit = 10;
    try {
      dispatch(productLoading(true));

      const data = (
        await ProductServices.getCategoryProducts({ categoryId, limit, page })
      ).data as {
        products: Product[];
        total: number;
        page: number;
      };

      dispatch({
        type: "FETCH_CATEGORY_PRODUCTS",
        payload: data,
      });
    } catch ({ response }) {
      printMessage("product.action => getCategoryProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

export const getSubCategoryProducts =
  (subCategoryId: string, page: number = 1) =>
  async (
    dispatch: ThunkDispatch<{}, {}, FetchSubCategoryProducts | ProductLoading>
  ) => {
    const limit = 10;
    try {
      dispatch(productLoading(true));

      const data = (
        await ProductServices.getSubCategoryProducts({
          subCategoryId,
          limit,
          page,
        })
      ).data as {
        products: Product[];
        total: number;
        page: number;
      };

      dispatch({
        type: "FETCH_SUB_CATEGORY_PRODUCTS",
        payload: data,
      });
    } catch ({ response }) {
      printMessage("product.action => getSubCategoryProducts()", response);
      if (response?.data?.errors) {
        alertMsg = createAlert("error", response.data.errors[0].message);
      }
    } finally {
      dispatch(productLoading(false));
      dispatch(setAlertMessage(alertMsg));
    }
  };

const reduceImages = (
  productToUpdate: Product,
  newValues: ProductFormValues
) => {
  const newImages = (newValues.images as { originFileObj: File }[]).filter(
    (i) => i.originFileObj
  );

  const oldImages = (
    newValues.images as {
      name: string;
      uid: string;
      url: string;
    }[]
  ).filter((i) => i.name && i.uid && i.url);

  const removedImages = productToUpdate.images.reduce((prv, cur) => {
    const img = (
      newValues.images as {
        uid: string;
        url: string;
        name: string;
      }[]
    ).find((i) => i.uid === cur.imageId);
    if (!img) prv.push(cur.imageId);
    return prv;
  }, [] as string[]);

  return { newImages, oldImages, removedImages };
};

const getProductUpdatedFields = (
  productToUpdate: Product,
  newValues: ProductFormValues
) => {
  const {
    images,
    removedImages,
    category: newCategory,
    subCategories: newSubCategories,
    ...restOfNewValues
  } = newValues;
  const {
    images: _,
    _id,
    createdAt,
    updatedAt,
    slug,
    ratings,
    sold,
    category,
    subCategories,
    ...rest
  } = productToUpdate;

  const updatedFields = Object.keys(rest).reduce((prv: any, key: any) => {
    if (
      restOfNewValues[key as keyof typeof restOfNewValues] !==
      rest[key as keyof typeof rest]
    ) {
      prv[key] = restOfNewValues[key as keyof typeof restOfNewValues];
    }

    return prv;
  }, {} as Partial<ProductFormValues>);

  return { ...updatedFields, newCategory, newSubCategories };
};
