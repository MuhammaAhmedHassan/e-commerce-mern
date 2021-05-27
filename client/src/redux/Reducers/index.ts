import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../../pages/history";
import user from "./user.reducer";
import error from "./error.reducer";
import category from "./category.reducer";
import subCategory from "./sub-category.reducer";
import product from "./product.reducer";
import search from "./search.reducer";

export default combineReducers({
  router: connectRouter(history),
  user,
  error,
  category,
  subCategory,
  product,
  search,
});
