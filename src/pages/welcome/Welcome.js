import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { NavigationActions } from "react-navigation";
import { storage } from "@cbd/utils-rn";

class Welcome extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    // 修改状态栏
    StatusBar.setBarStyle("dark-content");
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor("#00000000");
    if (!navigation.isFocused()) {
      navigation.push("Welcome");
      return;
    }
    this.goto();
  }

  goto = () => {
    const { navigation } = this.props;
    storage.get("userInfo").then(res => {
      if (res !== null && Object.keys(res).length !== 0) {
        const navigateAction = NavigationActions.navigate({
          routeName: "Home",
        });
        navigation.dispatch(navigateAction);
        // navigation.navigate("Home");
      } else {
        const navigateAction = NavigationActions.navigate({
          routeName: "Login",
        });
        navigation.dispatch(navigateAction);
        // navigation.navigate("Login");
      }
    });
  };

  render() {
    return <View style={{ flex: 1, backgroundColor: "#FFFFFF" }} />;
  }
}

export default Welcome;
