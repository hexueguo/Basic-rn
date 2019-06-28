/**
 * 手势滑动解锁demo页
 */
import React, { Component } from "react";
// import { View, Text } from "react-native";
import { ColorBackgroundComp } from "theme";
import PasswordGesture from "components/GesturePassword";

class GesturePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "normal", // 只有3种'normal', 'right' or 'wrong'
      message: "请输入手势密码",
    };
  }

  onStart = () => {
    // this.setState({
    //   status: "normal",
    // });
  };

  /**
   * 手势滑动结束后回调
   * @param password  手势滑动结束后的密码
   */
  onEnd = () => {};

  render() {
    const { status, message = "" } = this.state;

    return (
      <PasswordGesture
        allowCross // 是否允许越过圆圈（例如：1 - > 7 - > 4），默认为false
        // innerCircle={false} // 是否显示内圈，默认显示
        outerCircle={false} // 是否显示外圈，默认显示
        interval={1000} // 消失间隔事件 单位ms
        status={status} // 状态
        message={message} // 显示消息
        style={{ backgroundColor: ColorBackgroundComp }} // 背景颜色
        onStart={this.onStart}
        onEnd={this.onEnd}
      />
    );
  }
}

export default GesturePassword;
