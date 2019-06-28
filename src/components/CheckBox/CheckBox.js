import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { ColorFontDisable, ColorPrimary } from "../../theme";
import Icon from "../Iconfont";

class CheckBox extends Component {
  constructor(props) {
    super(props);
    const { defaultChecked = false } = props;
    this.state = {
      checked: defaultChecked,
    };
  }

  onChange = () => {
    const { checked } = this.state;
    const { onChange = () => {} } = this.props;
    this.setState(
      {
        checked: !checked,
      },
      () => {
        onChange(!checked);
      }
    );
  };

  render() {
    const { checked } = this.state;
    const { style = {}, size = 20 } = this.props;
    const color = checked ? ColorPrimary : ColorFontDisable;
    return (
      <View style={style}>
        <TouchableOpacity activeOpacity={1} onPress={this.onChange}>
          <View
            style={{
              borderColor: color,
              borderWidth: 1,
              borderRadius: size / 2,
              width: size,
              height: size,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="check" size={size / 1.3} color={color} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CheckBox;
