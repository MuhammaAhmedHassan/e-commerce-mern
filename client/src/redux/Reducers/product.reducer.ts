import {
  ProductActionTypes,
  ProductInitialState,
} from "../../const/types/product";

const initialState: ProductInitialState = {
  loading: false,
  productsPerPage: {},
  newArrivals: {},
  bestSellers: {},
  relatedProducts: {},
  singleProduct: null,
  bestSellersPageNumber: 0,
  pageNumber: 0,
  totalProducts: 0,
};

// move this to a utility function
const toObject = (arr: unknown) => {
  return (arr as [{ _id: string }]).reduce((prv, cur) => {
    prv[cur._id] = cur;
    return prv;
  }, {} as { [_id: string]: unknown });
};

export default function (state = initialState, action: ProductActionTypes) {
  switch (action.type) {
    case "PRODUCT_LOADING":
    case "READ_ALL_PRODUCTS":
      return { ...state, ...action.payload };

    case "READ_PRODUCTS_PER_PAGE":
      return {
        ...state,
        productsPerPage: toObject(action.payload.products),
        totalProducts: action.payload.total,
        pageNumber: action.payload.page,
      };

    case "READ_NEW_ARRIVALS_PER_PAGE":
      return {
        ...state,
        newArrivals: {
          ...state.newArrivals,
          ...toObject(action.payload.products),
        },
        totalProducts: action.payload.total,
        pageNumber: action.payload.page,
      };

    case "READ_BEST_SELLERS_PER_PAGE":
      return {
        ...state,
        bestSellers: {
          ...state.bestSellers,
          ...toObject(action.payload.products),
        },
        bestSellersPageNumber: action.payload.page,
      };

    case "CREATE_PRODUCT":
      state.productsPerPage[action.payload.product._id] =
        action.payload.product;
      return { ...state, ...state.productsPerPage };

    case "UPDATE_PRODUCT":
      state.productsPerPage[action.payload.product._id] = {
        ...state.productsPerPage[action.payload.product._id],
        ...action.payload.product,
      };
      return { ...state, productsPerPage: { ...state.productsPerPage } };

    case "DELETE_PRODUCT":
      delete state.productsPerPage[action.payload.productId];
      return { ...state, productsPerPage: { ...state.productsPerPage } };

    case "UPDATE_PRODUCT_RATING":
      switch (action.payload.productCategory) {
        case "best-sellers":
          return {
            ...state,
            bestSellers: {
              ...state.bestSellers,
              [action.payload.product._id]: action.payload.product,
            },
          };
        case "recent-arrivals":
          return {
            ...state,
            newArrivals: {
              ...state.newArrivals,
              [action.payload.product._id]: action.payload.product,
            },
          };
        default:
          return {
            ...state,
            relatedProducts: {
              ...state.relatedProducts,
              [action.payload.product._id]: action.payload.product,
            },
          };
      }

    case "FETCH_SINGLE_PRODUCT":
      return { ...state, singleProduct: action.payload.product };

    case "FETCH_RELATED_PRODUCT":
      return {
        ...state,
        relatedProducts: { ...toObject(action.payload.products) },
      };

    default:
      return state;
  }
}
