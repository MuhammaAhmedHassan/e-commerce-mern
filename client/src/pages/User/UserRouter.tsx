import React from "react";
import "./User.less";
import { Switch, Route, RouteComponentProps } from "react-router-dom";

import { userRoutes } from "../../const/routes";
import NotFound from "../../shared/components/404NotFound";
import { HistoryPage, Whishlist, UpdatePassword } from "./component";
import DashboardLayout from "../../shared/components/DashboardLayout";

function UserRouter(props: RouteComponentProps) {
  const {
    match,
    location: { pathname },
  } = props;

  return (
    <DashboardLayout {...props}>
      <Switch>
        <Route exact path={userRoutes.HISTORY} component={HistoryPage} />
        <Route exact path={userRoutes.WISHLIST} component={Whishlist} />
        <Route
          exact
          path={userRoutes.UPDATE_PASSWORD}
          component={UpdatePassword}
        />

        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

export default UserRouter;
