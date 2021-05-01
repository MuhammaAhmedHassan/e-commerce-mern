import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { onBoardingRoutes } from "../../const/routes";
import { SignUp, Login, RegisterComplete, ForgotPassword } from "./components";
import NotFound from "../../shared/components/404NotFound";

function OnBoardingRouter(props: RouteComponentProps) {
  const {
    match: { path },
  } = props;

  return (
    <Switch>
      <Redirect exact from={path} to={onBoardingRoutes.SIGN_UP} />
      <Route exact path={onBoardingRoutes.SIGN_UP} component={SignUp} />
      <Route exact path={onBoardingRoutes.LOGIN} component={Login} />
      <Route
        exact
        path={onBoardingRoutes.SIGN_UP_SUCCESS}
        component={RegisterComplete}
      />
      <Route
        exact
        path={onBoardingRoutes.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default OnBoardingRouter;
