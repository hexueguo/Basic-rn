import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "components/Iconfont";
import styles from "./styles";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      navigation,
      iconName = "",
      text = "",
      size = 10,
      goto = "",
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (typeof goto === "string") {
            // 进入不同的路由
            navigation.navigate(goto);
          } else {
            goto();
          }
        }}
        style={styles.row}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon type="icon" name={iconName} size={size} />
          <Text style={{ marginLeft: 8 }}>{text}</Text>
        </View>
        <Icon name="right" size={16} color="rgba(0,0,0,0.2)" />
      </TouchableOpacity>
    );
  }
}

export default ListItem;
