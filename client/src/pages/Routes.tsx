import { ReactElement, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseRoutes, generalRoutes, onBoardingRoutes } from "../const/routes";
import OnBoardingRouter from "./OnBoarding";
import UserRouter from "./User";
import AdminRouter from "./Admin";
import HomeRouter from "./Home";
import { ShopPage } from "./Shop/ShopPage";
import NotFound from "../shared/components/404NotFound";
import { clearAlertMessage } from "../redux/actions/alert.action";
import { RootState } from "../const/types";
import CustomAlert from "../shared/components/Alert";
import { AppLocalStorage } from "../utils/AppLocalStorage";
import { roleBasedRedirect } from "../redux/actions/user.action";

function Routes(): ReactElement {
  const dispatch = useDispatch();
  const token = () => AppLocalStorage.getItem("USER_AUTH_TOKEN");
  const history = useHistory();

  const { message, type, description, role } = useSelector(
    ({ error, user: { role } }: RootState) => ({
      message: error.message,
      type: error.type,
      description: error.description,
      role,
    })
  );

  useEffect(() => {
    if (message) setTimeout(() => dispatch(clearAlertMessage()), 5000);
  }, [message]);

  useEffect(() => {
    if (!token()) {
      const pathname = window.location.pathname;
      const isUserRoute = pathname.indexOf("user") !== -1;
      const isAdminRoute = pathname.indexOf("admin") !== -1;
      if (!isUserRoute || !isAdminRoute) return;
      else history.push(generalRoutes.HOME_PAGE);
    } else roleBasedRedirect(history, role);
  }, [token()]);

  return (
    <div>
      {message && (
        <CustomAlert
          showIcon={true}
          message={message}
          description={description}
          type={type}
          className="alert-message"
        />
      )}

      <Switch>
        <Route path={baseRoutes.ONBOARDING} component={OnBoardingRouter} />
        <Route path={baseRoutes.USER} component={UserRouter} />
        <Route path={baseRoutes.ADMIN} component={AdminRouter} />
        <Route path={baseRoutes.SHOP} component={ShopPage} />
        <Route path={baseRoutes.HOME} component={HomeRouter} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Routes;
