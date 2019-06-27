import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import HomePage from "./pages/home";
import StorePage from "./pages/store";
import AboutPage from "./pages/about";
import DetailPage from "./pages/detail";

const MainStack = createBottomTabNavigator({
  Home: HomePage,
  Store: StorePage,
});

const CardNavigator = createStackNavigator(
  {
    Detail: DetailPage,
    About: AboutPage,
  },
  {
    headerMode: "none",
  }
);

const AppNavigator = createStackNavigator({
  Main: {
    screen: MainStack,
  },
  Info: {
    screen: CardNavigator,
  },
});

export default AppNavigator;
