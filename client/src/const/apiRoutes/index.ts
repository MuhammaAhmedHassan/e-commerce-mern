export const baseUrl = process.env.REACT_APP_API!;

// auth api routes
export const authApiRoutes = {
  createOrUpdateUser: baseUrl + "/create-or-update-user",
  currentUser: baseUrl + "/current-user",
};

// Category api routes
export const categoryApiRoutes = {
  create: baseUrl + "/category",
  read: baseUrl + "/category/${slug}",
  update: baseUrl + "/category/${slug}",
  delete: baseUrl + "/category/${slug}",

  getAll: baseUrl + "/all-categories",
};

// Sub category api routes
export const subCategoryApiRoutes = {
  create: baseUrl + "/category/${parentCategoryId}/sub-category",
  read: baseUrl + "/category/${parentCategoryId}/sub-category/${slug}",
  update: baseUrl + "/category/${parentCategoryId}/sub-category/${slug}",
  delete: baseUrl + "/category/${parentCategoryId}/sub-category/${slug}",

  getAll: baseUrl + "/all-sub-categories",
};

// Product api routes
export const productApiRoutes = {
  create: "/product",
  read: "/product",
  update: "/product/${productId}",
  delete: "/product/${productId}",
  readPerPage: "/product",
  getAll: "/all-products",

  testBestSellers: "/product/:page/:limit/:sort",
};
