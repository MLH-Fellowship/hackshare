import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./pages/Profile/index";
import Experts from "./pages/Experts";
import Learners from "./pages/Learners";
import Landing from "./pages/Landing";
import Fallback from "./pages/Fallback";
import Edit from "./pages/Edit";

const Router = () => {
  const routes = [
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/experts",
      component: Experts,
    },
    {
      path: "/learners",
      component: Learners,
    },
    {
      path: "/edit",
      component: Edit,
    },
  ];

  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      {routes.map((route) =>
        isAuthenticated ? (
          <Route {...route} key={route.path} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
            key={route.path}
          />
        )
      )}
      <Route exact path="*" component={Fallback} />
    </Switch>
  );
};

export default Router;
