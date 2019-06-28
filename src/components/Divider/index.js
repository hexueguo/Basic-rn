import React, { Component } from "react";
import { View } from "react-native";
import { createStyles } from "utils";

class Divide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style = {}, type = "horizontal" } = this.props;
    const typeStyle = styles[type];
    const style_ = { ...typeStyle, ...style };
    return <View style={style_} />;
  }
}

const styles = createStyles({
  horizontal: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  vertical: {
    height: "100%",
    width: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export default Divide;
