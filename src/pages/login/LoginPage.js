import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { InputItem, Button, Toast, Portal } from "@ant-design/react-native";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { storage } from "@cbd/utils-rn";
import Icon from "components/Iconfont";
import Divide from "components/Divider";
import Logo from "./components/Logo";
import styles from "./styles";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: {
        schoolName: "",
        schoolCode: "",
      }, // 学校
      phone: "", // 手机号
      password: "", // 密码
      allowLogin: true, // 是否允许登录
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      school: { schoolName = "" },
      phone = "",
      password = "",
    } = state;
    // 判断是否都已输入/选择完成，允许点击登录按钮
    if (
      schoolName &&
      schoolName.length > 0 &&
      phone.length === 13 &&
      password.length >= 6 &&
      password.length <= 16
    ) {
      return { ...state, allowLogin: true };
    } else {
      return { ...state, allowLogin: false };
    }
  }

  /**
   * 每次进入页面执行的操作
   */
  screenDidFocus = () => {
    const {
      school: { schoolName = "", schoolCode = "" },
      phone,
    } = this.state;
    const { navigation } = this.props;

    const checkedSchool = navigation.getParam("checkedSchool"); // 获取从学校选择页面传递的学校数据

    const successData = navigation.getParam("successData") || {}; // 获取从注册流程 or 重置密码页面 传递过来的学校和手机数据
    const { school = {} } = successData;
    const { schoolName: schoolName_, schoolCode: schoolCode_ } = school;

    this.setState(
      {
        // 学校数据先以学校选择页面传递过来数据的为准，其次为注册或者密码重置页面传递过来的,最后以本页为准
        school: checkedSchool || {
          schoolName: schoolName_ || schoolName,
          schoolCode: schoolCode_ || schoolCode,
        },
        phone: successData.phone || phone, // 先以别的页面传递过来的为准
        password: "", // 清空密码
      },
      () => {
        // 清空路由参数
        navigation.state.params = {};
      }
    );
  };

  /**
   * 跳转到学校选择页
   */
  goSchoolSelect = () => {
    const { navigation } = this.props;
    navigation.navigate("SchoolSelect", { parentPage: "Login" }); // 将当前页面路由地址传递过去
  };

  /**
   * 点击登录按钮，跳转到主页
   */
  goMain = () => {
    const ToastKey = Toast.loading("登陆中", 0);

    const { phone = "" } = this.state;
    const phone_ = phone.replace(/\s+/g, "");

    // 清除loading
    Portal.remove(ToastKey);

    // 将用户信息存入手机内存中，持久化
    const userInfo = { userName: phone_ };
    storage.set("userInfo", userInfo).then(() => {
      GLOBAL.userInfo = userInfo;
      // 登录验证通过，跳转到Home页
      const { navigation } = this.props;
      navigation.navigate("Home");
    });
  };

  /**
   *  跳转至注册页面
   */
  goSignup = () => {
    const { navigation } = this.props;
    navigation.navigate("Signup");
  };

  /**
   * 跳转至重设密码页面
   */
  goResetPassword = () => {
    const { navigation } = this.props;
    navigation.navigate("ResetPassword");
  };

  render() {
    const {
      school: { schoolName = "" },
      phone,
      password,
      allowLogin,
    } = this.state;
    return (
      <View style={styles.root}>
        <Logo />

        <View style={styles.form}>
          <TouchableOpacity style={styles.school} onPress={this.goSchoolSelect}>
            <InputItem
              type="text"
              value={schoolName}
              labelNumber={6}
              editable={false}
              placeholder="请选择学校"
              style={styles.InputItem}
            >
              <Text style={styles.InputItemText}>学校</Text>
            </InputItem>
            <View style={styles.schoolIconView}>
              <Icon name="right" size={18} />
            </View>
          </TouchableOpacity>

          <InputItem
            type="phone"
            labelNumber={6}
            value={phone}
            onChange={value => {
              this.setState({
                phone: value,
              });
            }}
            placeholder="请输入手机号码"
            style={styles.InputItem}
          >
            <Text style={styles.InputItemText}>+86</Text>
          </InputItem>

          <InputItem
            type="password"
            maxLength={16}
            labelNumber={6}
            value={password}
            onChange={value => {
              this.setState({
                password: value,
              });
            }}
            placeholder="请输入密码"
            style={styles.InputItem}
          >
            <Text style={styles.InputItemText}>密码</Text>
          </InputItem>
        </View>

        <Button
          type="primary"
          disabled={!allowLogin}
          style={styles.loginButton}
          onPress={this.goMain}
        >
          <Text style={styles.loginButtonText}>登录</Text>
        </Button>

        <View style={styles.footer}>
          <View style={styles.registered}>
            <TouchableOpacity onPress={this.goSignup}>
              <Text style={styles.footerText}>立即注册</Text>
            </TouchableOpacity>
          </View>
          <Divide type="vertical" style={{ height: "70%" }} />
          <View style={styles.forgetPw}>
            <TouchableOpacity onPress={this.goResetPassword}>
              <Text style={styles.footerText}>忘记密码</Text>
            </TouchableOpacity>
          </View>
        </View>

        <NavigationEvents onDidFocus={this.screenDidFocus} />
      </View>
    );
  }
}

export default connect(({ login }) => ({
  loginData: login,
}))(LoginPage);
