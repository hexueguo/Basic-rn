import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ColorFontTitle, ColorFontBase } from "theme";
import Icon from "components/Iconfont";
import styles from "./styles";

class TopNavBar extends React.Component {
  state = {};

  render() {
    const display = { display: "flex", flexDirection: "row" };
    const text = { fontSize: 16, color: "rgb(0,0,0)" };
    const { navigation } = this.props;
    const back = () => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (navigation && typeof navigation.goBack === "function")
              navigation.pop();
            onPressBack();
          }}
        >
          <View style={display}>
            <View>
              <Icon name="left" size={20} color={ColorFontBase} />
            </View>
            {/* <Text style={text}>返回</Text> */}
          </View>
        </TouchableOpacity>
      );
    };
    const {
      leftText = back(),
      midText = "",
      rightText = "",
      customStyle = {},
      rightClick = () => {},
      onPressBack = () => {},
    } = this.props;

    return (
      <View style={{ ...styles.root, ...customStyle }}>
        <View style={styles.left}>{leftText}</View>
        <View style={styles.mid}>
          {typeof midText === "string" ? (
            <Text
              style={{
                ...text,
                // fontWeight: "bold",
                color: ColorFontTitle,
              }}
            >
              {midText}
            </Text>
          ) : (
            midText
          )}
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={() => {
              rightClick();
            }}
          >
            {typeof rightText === "string" ? (
              <Text style={text}>{rightText}</Text>
            ) : (
              rightText
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TopNavBar;
