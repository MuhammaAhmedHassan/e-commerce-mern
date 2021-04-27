// export const baseURL = "http://localhost:3000";
export const baseRoutes = {
  ONBOARDING: "/auth",
  HOME: "/",
  ADMIN: "/admin",
  USER: "/user",
};

export const generalRoutes = {
  HOME_PAGE: baseRoutes.HOME,
  PRODUCT_PAGE:
    baseRoutes.HOME + "product/:productCategory/:productId/:productSlug",
  NEW_ARRIVALS:
    baseRoutes.HOME + "product/new-arrivals/:productId/:productSlug",
  BEST_SELLERS:
    baseRoutes.HOME + "product/best-sellers/:productId/:productSlug",
};

export const onBoardingRoutes = {
  LOGIN: baseRoutes.ONBOARDING + "/login",
  SIGN_UP: baseRoutes.ONBOARDING + "/sign-up",
  SIGN_UP_SUCCESS: baseRoutes.ONBOARDING + "/sign-up/complete",
  FORGOT_PASSWORD: baseRoutes.ONBOARDING + "/forgot-password",
};

export const adminRoutes = {
  DASHBOARD: baseRoutes.ADMIN + "/dashboard",
  PRODUCTS: baseRoutes.ADMIN + "/products",
  PRODUCT: baseRoutes.ADMIN + "/products/product",
  CATEGORY: baseRoutes.ADMIN + "/category",
  SUB_CATEGORY: baseRoutes.ADMIN + "/sub-category",
  COUPON: baseRoutes.ADMIN + "/coupon",
  UPDATE_PASSWORD: baseRoutes.ADMIN + "/update-password",
};

export const userRoutes = {
  HISTORY: baseRoutes.USER + "/history",
  UPDATE_PASSWORD: baseRoutes.USER + "/update-password",
  WISHLIST: baseRoutes.USER + "/wishlist",
};
