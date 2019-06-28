import React, { Component } from "react";
import { View, Image } from "react-native";
import LogoImg from "assets/image/logo.png";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          marginTop: 69,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={LogoImg} style={{ width: 88, height: 88 }} />
      </View>
    );
  }
}

export default Logo;
