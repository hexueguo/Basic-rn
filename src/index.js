import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "@ant-design/react-native";
import { storage } from "@cbd/utils-rn";
import Router, { routerMiddleware, routerReducer } from "./main";
import dva from "./utils/dva";
// import demoModel from "./models/public";
// import homeModel from "./models/home";
import loginModel from "./models/login";
import demoModel from "./models/public";
import homeModel from "./models/home";
import signupModel from "./models/signup";
import personModel from "./models/person";
import videoModel from "./models/video";
import schoolModel from "./models/school";
import messageModel from "./models/message";
import mineModel from "./models/mine";

const app = dva({
  initialState: {},
  models: [
    loginModel,
    demoModel,
    homeModel,
    signupModel,
    personModel,
    videoModel,
    schoolModel,
    messageModel,
    mineModel,
  ],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError() {
    // console.log("onError", e);
  },
});

/* 初始化空的用户信息 */
GLOBAL.userInfo = {};
storage.get("userInfo").then(res => {
  if (res) {
    GLOBAL.userInfo = res;
    // if (global.__DEV__) {
    // console.log("postman header cookie");
    // console.log(`session=${res.userToken}` || "");
    // }
  }
});

if (global.__DEV__) {
  // global.XMLHttpRequest = global.originalXMLHttpRequest
  //   ? global.originalXMLHttpRequest
  //   : global.XMLHttpRequest;
  // global.FormData = global.originalFormData
  //   ? global.originalFormData
  //   : global.FormData;
  // global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  // global.FileReader = global.originalFileReader
  //   ? global.originalFileReader
  //   : global.FileReader;
}

const App = app.start(
  <Provider>
    <Router />
  </Provider>
);

global.app = app;

// eslint-disable-next-line no-console
console.disableYellowBox = true; // 关闭全部黄色警告

AppRegistry.registerComponent("ReactNativeProject", () => App);
