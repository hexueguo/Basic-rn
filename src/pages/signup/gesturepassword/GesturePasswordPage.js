/**
 * 手势滑动页
 */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Modal } from "@ant-design/react-native";
import PasswordGesture from "components/GesturePassword";
import TopNavBar from "components/TopNavBar";
import {
  ColorPrimary,
  ColorBackgroundComp,
  ColorFontBase,
  FontSizeTL,
} from "theme";

class GesturePasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "normal", // 只有3种'normal', 'right' or 'wrong'
      message: "请输入手势密码",
      firstPassword: "", // 第一次的手势密码
      visible: false, // 是否显示密码完成确认框
    };
  }

  /**
   * 开始滑动糊回调
   */
  onStart = () => {
    this.setState({
      status: "normal",
    });
  };

  /**
   * 手势滑动结束后回调
   * @param password  手势滑动结束后的密码
   */
  onEnd = password => {
    const { firstPassword } = this.state;
    if (firstPassword === "") {
      this.setState({
        firstPassword: password,
        message: "请再次输入手势密码",
      });
    } else if (firstPassword === password) {
      this.addGestruePwd(password);
    } else {
      this.setState({
        status: "wrong",
        message: "输入密码不同，请重输",
        firstPassword: "",
      });
    }
  };

  /**
   * 完成手势密码设置，发送请求，新增改用户的手势密码
   */
  addGestruePwd = () => {
    this.setState({
      message: "已完成密码设置",
      visible: true,
    });
  };

  /**
   * 关闭确认弹窗，调用完成注册流程方法
   */
  closeModal = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.endProcess();
      }
    );
  };

  /**
   * 设置手势完成，完成注册流程，跳转到登录页
   */
  endProcess = () => {
    const {
      navigation,
      dispatch,
      signupData: { school = {}, phone },
    } = this.props;
    navigation.navigate("Login", { successData: { school, phone } }); // 跳转到登录页，并将学校和手机号传递到首页
    dispatch({
      type: "signup/clear/formValue",
    });
  };

  render() {
    const { status, message, visible } = this.state;
    const { navigation } = this.props;

    // 确认弹窗modal底部按钮组
    const footerButtons = [
      {
        text: (
          <Text style={{ fontSize: FontSizeTL, color: ColorPrimary }}>
            确认
          </Text>
        ),
        onPress: this.closeModal,
      },
    ];

    return (
      <View style={{ flex: 1 }}>
        <TopNavBar midText="手势密码" navigation={navigation} />
        <PasswordGesture
          allowCross // 是否允许越过圆圈（例如：1 - > 7 - > 4），默认为false
          outerCircle={false} // 是否显示内圈，默认显示
          interval={1000} // 消失间隔事件 单位ms
          status={status} // 状态
          message={message} // 显示消息
          style={{ backgroundColor: ColorBackgroundComp }} // 背景颜色
          onStart={this.onStart}
          onEnd={this.onEnd}
        />

        <Modal
          popup
          maskClosable
          transparent
          visible={visible}
          footer={footerButtons}
        >
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ fontSize: FontSizeTL, color: ColorFontBase }}>
              已完成密码设置
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(({ signup }) => ({
  signupData: signup,
}))(GesturePasswordPage);
