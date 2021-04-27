import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { generalRoutes } from "../../const/routes";
import NotFound from "../../shared/components/404NotFound";
import { HomePage, ShowProduct } from "./components";

function HomeRouter(props: RouteComponentProps) {
  const {
    match: { path },
  } = props;

  return (
    <Switch>
      <Route exact path={generalRoutes.HOME_PAGE} component={HomePage} />
      <Route exact path={generalRoutes.PRODUCT_PAGE} component={ShowProduct} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default HomeRouter;
