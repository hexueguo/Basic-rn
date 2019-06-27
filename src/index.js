import React from "react";
import { AppRegistry } from "react-native";
import Router, { routerMiddleware, routerReducer } from "./main";
import dva from "./utils/dva";

import demoModel from "./models/public";
import homeModel from "./models/home";

const app = dva({
  initialState: {},
  models: [demoModel, homeModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError() {
    // console.log("onError", e);
  },
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

const App = app.start(<Router />);

AppRegistry.registerComponent("ReactNativeProject", () => App);
