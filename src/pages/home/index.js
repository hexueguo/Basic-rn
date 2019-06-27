import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

import styles from "./styles";

const LogoTitle = () => {
  return <Text>Text</Text>;
};

class HomePage extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#fff"
      />
    ),
    title: "Home ...",
    headerStyle: {
      backgroundColor: "#000",
    },
    headerTintColor: "#fff",
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: "home/fetch", payload: "home" });
  }

  render() {
    const { navigation, homeData } = this.props;
    const { title } = homeData;
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{`这是${title}`}</Text>
        <Button title="go About" onPress={() => navigation.navigate("About")} />
        <Button
          title="go Detail"
          onPress={() => navigation.navigate("Detail")}
        />
      </View>
    );
  }
}

export default connect(stores => ({ homeData: stores.home }))(HomePage);
