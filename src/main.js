import React, { PureComponent } from "react";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from "react-navigation-redux-helpers";
import { connect } from "react-redux";
import AppRouter from "./router";

export const routerReducer = createNavigationReducer(AppRouter);

export const routerMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.router
);

const App = reduxifyNavigator(AppRouter, "root");

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backHandle);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandle);
  }

  backHandle = () => {
    const { router, dispatch } = this.props;
    const currentScreen = getActiveRouteName(router);
    if (currentScreen === "Login") {
      return true;
    }
    if (currentScreen !== "Home") {
      dispatch(NavigationActions.back());
      return true;
    }
    // 需要忽略的tab路由组，让其不会后退
    const ignoreRouters = [
      "Member",
      "Home",
      "Video",
      "Message",
      "Mine",
      "Demo",
    ];
    if (!ignoreRouters.includes(currentScreen)) {
      dispatch(NavigationActions.back());
      return true;
    }
    return false;
  };

  render() {
    const { dispatch, router } = this.props;

    return <App dispatch={dispatch} state={router} />;
  }
}

export default connect(stores => ({
  router: stores.router,
}))(Router);
