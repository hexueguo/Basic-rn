import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Toast, Portal, Modal } from "@ant-design/react-native";
import { md5Encryption } from "utils";
import { logoutRequest, clearUserInfo } from "utils/logout";
import {
  ColorPrimary,
  ColorBackgroundComp,
  ColorFontBase,
  ColorFontDisable,
} from "theme";
import GesturePassword from "../GesturePassword";

/**
 * 验证手势密码全局遮盖组件
 */
class VerifyGesture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "normal", // 只有3种'normal', 'right' or 'wrong'
      message: "请输入手势密码",
      times: 3, // 剩余手势密码错误次数
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
    const ToastKey = Toast.loading(false, 0);
    const { dispatch } = this.props;
    const { userName } = GLOBAL.userInfo;
    dispatch({
      type: "public/getGestruePasswdSalt",
      payload: { userName },
    }).then(res => {
      if (res && res.errCode === "0") {
        const { data = {} } = res;
        const { passwdSalt = "" } = data;

        // md5加密
        const password_ = md5Encryption(password, passwdSalt);

        dispatch({
          type: "public/verifyGestruePwd",
          payload: {
            userName,
            password: password_,
          },
        }).then(result => {
          Portal.remove(ToastKey);
          if (result && result.errCode === "0") {
            // 验证通过，将组件状态初始化
            this.setState(
              {
                status: "normal",
                message: "请输入手势密码",
              },
              () => {
                // 关闭手势密码验证组件
                dispatch({
                  type: "public/toggle/verifyGesture",
                  payload: {
                    showVerifyGesture: false,
                  },
                });
              }
            );
          } else {
            const { times } = this.state;
            if (times > 1) {
              this.setState({
                status: "wrong",
                message: `密码错误，请重输（剩余${times - 1}次）`,
                times: times - 1,
              });
            } else {
              // 输入密码超过三次，则直接注销该用户登录，跳转到登录页
              Toast.info("已输入错误三次，将注销该用户！", 1, () => {
                this.loginOut();
              });
            }
          }
        });
      } else {
        Portal.remove(ToastKey);
        this.setState({
          status: "wrong",
          message: res.errMsg,
        });
      }
    });
  };

  /**
   * 注销登录，跳转到登录页
   */
  loginOut = () => {
    const { dispatch } = this.props;
    const { userName } = GLOBAL.userInfo;
    // 注销登录，清除用户信息
    logoutRequest(dispatch, userName, () => {
      clearUserInfo();
    });
  };

  /**
   * 忘记手势密码
   */
  forgetGesturePwd = () => {
    Modal.alert(
      <Text style={{ lineHeight: 70, color: ColorFontBase, fontSize: 18 }}>
        是否重新登录？
      </Text>,
      null,
      [
        {
          text: (
            <Text style={{ color: ColorFontDisable, fontSize: 18 }}>取消</Text>
          ),
        },
        {
          text: <Text style={{ color: ColorPrimary, fontSize: 18 }}>确定</Text>,
          onPress: this.loginOut,
        },
      ]
    );
  };

  render() {
    const { status, message } = this.state;
    const { publicData } = this.props;
    const { showVerifyGesture = false } = publicData;
    return showVerifyGesture ? (
      <View
        style={{
          zIndex: 100000,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: ColorBackgroundComp,
        }}
      >
        <GesturePassword
          allowCross
          interval={1000}
          outerCircle={false}
          style={{ backgroundColor: ColorBackgroundComp }}
          status={status}
          message={message}
          onStart={this.onStart}
          onEnd={this.onEnd}
        />
        <View
          style={{
            position: "absolute",
            bottom: 30,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={this.forgetGesturePwd}>
            <Text style={{ fontSize: 16, color: ColorPrimary }}>
              忘记手势密码？
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }
}

export default connect(stores => ({ publicData: stores.public }))(
  VerifyGesture
);
