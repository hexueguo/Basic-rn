import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ColorFontTitle } from "theme";
import Icon from "components/Iconfont";
import styles from "./styles";

class TopBack extends React.Component {
  back = () => {
    const {
      navigation,
      onPressBack = () => {},
      leftText = "上一步",
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (navigation && typeof navigation.goBack === "function") {
            navigation.pop();
          }
          onPressBack();
        }}
      >
        <View style={styles.leftDisplay}>
          <View>
            <Icon name="left" size={16} color={ColorFontTitle} />
          </View>
          <Text style={styles.leftText}>{leftText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { style = {} } = this.props;

    return (
      <View style={{ ...styles.root, ...style }}>
        <View style={styles.left}>{this.back()}</View>
      </View>
    );
  }
}

export default TopBack;
