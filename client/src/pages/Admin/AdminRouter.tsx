import React, { useEffect } from "react";
import { RouteComponentProps, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../const/types";
import { adminRoutes, userRoutes } from "../../const/routes";
import { setAlertMessage } from "../../redux/actions/alert.action";
import {
  AdminDashboard,
  CategoryPage,
  SubCategoryPage,
  ProductPage,
  ProductForm,
} from "./components";
import NotFound from "../../shared/components/404NotFound";
import DashboardLayout from "../../shared/components/DashboardLayout";

function AdminRouter(props: RouteComponentProps) {
  const { history } = props;
  const dispatch = useDispatch();
  const { role } = useSelector(({ user: { role } }: RootState) => ({ role }));

  useEffect(() => {
    if (role !== null && role === "subscriber") {
      dispatch(
        setAlertMessage({
          type: "error",
          message: "Error",
          description: "Admin route. Access denied.",
        })
      );
      history.push(userRoutes.HISTORY);
    }
  }, [role]);

  return (
    <DashboardLayout {...props}>
      <Switch>
        <Route exact path={adminRoutes.DASHBOARD} component={AdminDashboard} />
        <Route
          exact
          path={adminRoutes.CATEGORY + "/:categoryId?" + "/:categoryName?"}
          component={CategoryPage}
        />
        <Route
          exact
          path={adminRoutes.SUB_CATEGORY + "/:subCategorySlug?"}
          component={SubCategoryPage}
        />
        <Route
          exact
          path={adminRoutes.PRODUCT + "/:productId?/:productSlug?"}
          component={ProductForm}
        />
        <Route exact path={adminRoutes.PRODUCTS} component={ProductPage} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

export default AdminRouter;
