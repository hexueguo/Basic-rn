import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { InputItem, Button, Toast } from "@ant-design/react-native";
import { NavigationEvents } from "react-navigation";
import Icon from "components/Iconfont";
import TopBack from "components/TopBack";
import styles from "./styles";

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendCode: false, // 是否已发送验证码
      waitTime: 60, // 默认等待60s
      allowConfirm: false, // 允许点击按钮
      school: {
        schoolName: "",
        schoolCode: "",
      }, // 学校
      phone: "", // 手机号
      code: "", // 验证码
      birthNum: "", // 出生证号
      password: "", // 需要修改的密码
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      school: { schoolName },
      phone,
      code,
      birthNum,
      password,
    } = state;
    // 判断是否都已输入/选择完成，允许点击按钮
    if (
      schoolName &&
      schoolName.length > 0 &&
      phone.length === 13 &&
      code.length === 4 &&
      birthNum.length > 0 &&
      password.length >= 6 &&
      password.length <= 16
    ) {
      return { ...state, allowConfirm: true };
    } else {
      return { ...state, allowConfirm: false };
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * 每次进入页面执行的操作
   */
  screenDidFocus = () => {
    const { navigation } = this.props;
    const checkedSchool = navigation.getParam("checkedSchool") || {}; // 获取从学校选择页面传递的学校数据
    this.setState({
      school: checkedSchool,
      // checkedSchool,
    });
  };

  /**
   * 跳转到学校选择页
   */
  goSchoolSelect = () => {
    const { navigation } = this.props;
    navigation.navigate("SchoolSelect", { parentPage: "ResetPassword" }); // 将当前页面路由地址传递过去
  };

  /**
   * 发送验证码，并开始倒计时
   */
  sendCode = () => {
    // 验证是否已输入手机号
    const { phone = "" } = this.state;
    if (!phone || phone.length !== 13) {
      Toast.info("请输入手机号码！");
      return;
    }

    // 将焦点放到验证码输入框
    this.codeInput.focus();

    Toast.info("已发送验证码！");
    this.setState(
      {
        sendCode: true,
      },
      () => {
        // 启动定时器，开始计时
        this.timer = setInterval(() => {
          const { waitTime } = this.state;
          if (waitTime >= 1) {
            this.setState({
              waitTime: waitTime - 1,
            });
          } else {
            this.setState({
              sendCode: false,
              waitTime: 60,
            });
            clearInterval(this.timer);
          }
        }, 1000);
      }
    );
  };

  /**
   * 输入框onChange监听
   */
  inputOnChange = (key, value) => {
    const input = {};
    input[key] = value;
    this.setState(input);
  };

  /**
   * 确认修改密码
   */
  confirmForm = () => {
    const { school = {}, phone = "" } = this.state;
    Toast.info("修改成功！", 1, () => {
      const { navigation } = this.props;
      navigation.navigate("Login", { successData: { school, phone } }); // 跳转到登录页，并将学校和手机号传递到首页
    });
  };

  render() {
    const {
      allowConfirm,
      sendCode,
      waitTime,
      school: { schoolName = "" },
      phone = "",
      code = "",
      birthNum = "",
      password = "",
    } = this.state;

    const { navigation } = this.props;
    return (
      <View style={styles.root}>
        <TopBack navigation={navigation} />
        <View style={styles.title}>
          <Text style={styles.titleText}>找回密码</Text>
        </View>

        <View style={styles.form}>
          <TouchableOpacity style={styles.school} onPress={this.goSchoolSelect}>
            <InputItem
              type="text"
              value={schoolName}
              labelNumber={6}
              editable={false}
              placeholder="请选择学校"
              style={styles.InputItem}
            />
            <View style={styles.schoolIconView}>
              <Icon name="right" size={18} />
            </View>
          </TouchableOpacity>
          <InputItem
            type="phone"
            labelNumber={6}
            value={phone}
            onChange={value => {
              this.inputOnChange("phone", value);
            }}
            placeholder="请输入手机号码"
            style={styles.InputItem}
          />
          <View style={styles.code}>
            <InputItem
              ref={ref => {
                this.codeInput = ref;
              }}
              type="number"
              maxLength={4}
              labelNumber={6}
              value={code}
              onChange={value => {
                this.inputOnChange("code", value);
              }}
              placeholder="请输入验证码"
              style={styles.InputItem}
            />
            {sendCode ? (
              <View style={styles.getCodeView}>
                <Text style={styles.getCodeText}>{`${waitTime}s`}</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.getCodeView}
                onPress={this.sendCode}
              >
                <Text style={styles.getCodeText}>获取验证码</Text>
              </TouchableOpacity>
            )}
          </View>
          <InputItem
            type="number"
            // maxLength={16}
            labelNumber={6}
            value={birthNum}
            onChange={value => {
              this.inputOnChange("birthNum", value);
            }}
            placeholder="请输入宝贝出生证明编号"
            style={styles.InputItem}
          />
          <InputItem
            type="password"
            maxLength={16}
            labelNumber={6}
            value={password}
            onChange={value => {
              this.inputOnChange("password", value);
            }}
            placeholder="修改密码（6-16位数字/字母）"
            style={styles.InputItem}
          />
        </View>

        <Button
          type="primary"
          disabled={!allowConfirm}
          style={styles.loginButton}
          onPress={this.confirmForm}
        >
          <Text style={styles.loginButtonText}>确认修改</Text>
        </Button>

        <NavigationEvents onDidFocus={this.screenDidFocus} />
      </View>
    );
  }
}

export default connect(({ login }) => ({
  loginData: login,
}))(ResetPasswordPage);
