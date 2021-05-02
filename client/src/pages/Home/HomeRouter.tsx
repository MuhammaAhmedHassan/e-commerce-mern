import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { generalRoutes } from "../../const/routes";
import NotFound from "../../shared/components/404NotFound";
import { HomePage, ShowSingleProduct } from "./components";

function HomeRouter(_: RouteComponentProps) {
  return (
    <Switch>
      <Route exact path={generalRoutes.HOME_PAGE} component={HomePage} />
      <Route
        exact
        path={generalRoutes.PRODUCT_PAGE}
        component={ShowSingleProduct}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default HomeRouter;
