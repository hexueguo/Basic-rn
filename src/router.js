import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import { View, Text } from "react-native";
import { ColorPrimary, ColorBackgroundComp } from "./theme";
import Iconfont from "./components/Iconfont";
// 路由功能性组件，用于防止stack路由回退到堆栈第一个页面
// import EmptyRouter from "./components/EmptyRouter/EmptyRouter";

// 忘记密码->重设
import ResetPasswordPage from "./pages/resetpwd";
// 学校选择页面
import SchoolSelectPage from "./pages/schoolselect";

// 欢迎页
import WelcomePage from "./pages/welcome";

// 登录注册模块页面 --- start
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AgreementPage from "./pages/signup/agreement";
import BabyInfoPage from "./pages/signup/babyinfo";
import UploadPhotoPage from "./pages/signup/UploadPhoto";
import GesturePasswordPage from "./pages/signup/gesturepassword";

import HomePage from "./pages/home";
import DemoPage from "./pages/demo";
import DetailPage from "./pages/detail";
import MinePage from "./pages/mine";

// 统一路由生成方式
const stack = (router, config = {}) =>
  createStackNavigator(router, Object.assign({ headerMode: "none" }, config));

// const switchNavi = (router, config = {}) =>
//   createSwitchNavigator(router, Object.assign({ headerMode: "none" }, config));

// 解决stack路由跳转返回顶层页面的问题
// let emptyRouterIndex = 1;
// const addEmptyRoute = () => {
//   const key = `EMPTY_ROUTE_NAME_${emptyRouterIndex}`;
//   emptyRouterIndex += 1;
//   return { [key]: EmptyRouter };
// };

//  -----------------   以下为功能页面路由相关配置 -----------------------

// 注册路由组
const signup = stack({
  Signup: SignupPage,
  Agreement: AgreementPage,
  Babyinfo: BabyInfoPage,
  UploadPhoto: UploadPhotoPage,
  SetGesturePassword: GesturePasswordPage, // 设置手势密码页
});

// 登录/注册/忘记密码 路由组
const LoginStack = stack({
  Login: LoginPage,
  signup,
  ResetPassword: ResetPasswordPage,
  SchoolSelect: SchoolSelectPage,
});

/**
 * Tab路由配置
 */
const tabOption = {
  Detail: {
    icon: "people",
    focusedIcon: "people-tab",
    text: "详情",
  },
  // Video: {
  //   icon: "video-o1",
  //   focusedIcon: "video",
  //   text: "视频",
  // },
  Home: {
    icon: "qr-code",
    focusedIcon: "people-tab",
    text: "二维码",
  },
  // Message: {
  //   icon: "news-o",
  //   focusedIcon: "news",
  //   text: "消息",
  // },
  Mine: {
    icon: "mine-o",
    focusedIcon: "mine",
    text: "我的",
  },
  Demo: {
    icon: "order-center-o",
    focusedIcon: "order-center",
    text: "Demo",
  },
};
const PreviousRoute = { name: "Home" };
// Tab路由
const MainTabStack = createBottomTabNavigator(
  Object.assign(
    {
      Detail: DetailPage,
      Home: HomePage,
      Mine: MinePage,
    },
    global.__DEV__
      ? {
          Demo: DemoPage,
        }
      : {}
  ),
  {
    navigationOptions: opts => {
      const { navigation } = opts;
      // const currentRouterName = navigation.state.key;
      return {
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;
          return tabOption[routeName].text === "二维码" ? (
            <View
              style={{
                height: 56,
                width: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: ColorBackgroundComp,
                marginBottom: 36,
                elevation: 4,
                shadowColor: "#C4CFE1",
                shadowOffset: { h: 0, w: 1 },
                shadowRadius: 3,
                shadowOpacity: 0.2,
              }}
              onPress={() => {
                navigation.navigate(PreviousRoute.name);
              }}
            >
              <Iconfont
                name={tabOption[routeName].icon}
                type="icon"
                color={focused ? ColorPrimary : "#C4CFE1"}
                size={24}
              />
            </View>
          ) : (
            <Iconfont
              name={
                focused
                  ? tabOption[routeName].focusedIcon
                  : tabOption[routeName].icon
              }
              type="icon"
              color={focused ? ColorPrimary : "#C4CFE1"}
              size={18}
            />
          );
        },
        tabBarLabel: ({ focused, route }) => {
          const { routeName } = route;
          return (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: focused ? ColorPrimary : "#C4CFE1",
                  fontSize: 10,
                  marginBottom: 8,
                }}
              >
                {tabOption[routeName].text}
              </Text>
            </View>
          );
        },
        tabBarOnPress: previousScene => {
          const jumpToIndex = previousScene.navigation.state.routeName;
          navigation.navigate(jumpToIndex);
          PreviousRoute.name = jumpToIndex;
        },
      };
    },
  }
);

/**
 * 主要路由，里面包含了Tab路由，和需要覆盖BottomTab的全屏页面路由
 */
const MainStack = stack({
  MainTabStack,
  // FullPageStack,
});

const AppNavigator = createSwitchNavigator(
  {
    WelcomeLogin: stack({
      /* 欢迎页 */
      Welcome: WelcomePage,
      /* 登录页 */
      LoginStack,
    }),
    /* App业务主要路由 */
    Main: MainStack,
  },
  {
    initialRouteName: "WelcomeLogin",
    headerMode: "none",
  }
);

export default AppNavigator;
