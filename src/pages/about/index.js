import React, { Component } from "react";
import { View, Button, Image } from "react-native";

const img = require("./erha3.jpg");

class AboutPage extends Component {
  static navigationOptions = () => {
    return {
      title: "About",
      headerStyle: {
        backgroundColor: "#f4511e",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    };
  };

  render() {
    const { navigation } = this.props;
    // console.log(navigation.state.params.id);
    // console.log(navigation.state.params.number);
    // console.log(navigation.getParam("id", "NO-ID"));
    // console.log(navigation.getParam("number", "NO-NUM"));
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={img} style={{ width: "100%", height: "80%" }} />
        <Button title="go Back" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  }
}

export default AboutPage;
