import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { InputItem, Button, Toast, Portal } from "@ant-design/react-native";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import Icon from "components/Iconfont";
import TopBack from "components/TopBack";
import Checkbox from "components/CheckBox";
import styles from "./styles";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendCode: false, // 是否已发送验证码
      waitTime: 60, // 默认等待60s
      allowNext: true, // 允许进行下一步
      agreement: false, // 是否同意条款
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      signupData: {
        school: { schoolName = "" },
        phone = "",
        code = "",
        password = "",
      },
    } = nextProps;
    // 判断是否都已输入/选择完成，允许点击下一步按钮
    if (
      schoolName &&
      schoolName.length > 0 &&
      phone.length === 13 &&
      code.length === 4 &&
      password.length >= 6 &&
      password.length <= 16
    ) {
      return { ...state, allowNext: true };
    } else {
      return { ...state, allowNext: false };
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    // 清空注册流程的所有数据
    const { dispatch } = this.props;
    dispatch({
      type: "signup/clear/formValue",
    });
  }

  /**
   * 每次进入页面执行的操作
   */
  screenDidFocus = () => {
    const { navigation } = this.props;
    const checkedSchool = navigation.getParam("checkedSchool") || {}; // 获取从学校选择页面传递的学校数据
    this.inputOnChange("school", checkedSchool);
  };

  /**
   * 将要离开页面执行的操作
   */
  screenWillBlur = () => {
    this.setState({
      sendCode: false,
      waitTime: 60,
    });
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  /**
   * 返回上一步，注册第一页返回到登录页的回调
   * 清空注册流程的所有数据
   */
  onPressBack = () => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: "signup/clear/formValue",
    // });
  };

  /**
   * 跳转到学校选择页
   */
  goSchoolSelect = () => {
    const { navigation } = this.props;
    navigation.navigate("SchoolSelect", { parentPage: "Signup" }); // 将当前页面路由地址传递过去
  };

  /**
   * 发送验证码，并开始倒计时
   */
  sendCode = () => {
    // 验证是否已输入手机号
    const {
      signupData: { phone = "" },
    } = this.props;
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
    const { dispatch } = this.props;
    dispatch({
      type: "signup/save/formValue",
      payload: {
        key,
        value,
      },
    });
  };

  /**
   * 判断是否为正常用户注册，如是跳转到下一步的页面->宝贝信息页
   *
   * 如果注册用户为接送人，则直接调用接送人注册接口，完成注册
   */
  goNext = () => {
    const { agreement } = this.state;
    if (!agreement) {
      Toast.info("请先同意隐私条款和用户协议");
      return;
    }
    // 开始loading
    const ToastKey = Toast.loading(false, 0);

    const { navigation } = this.props;

    Portal.remove(ToastKey);
    Toast.info("验证通过！", 1, () => {
      navigation.navigate("Babyinfo");
    });
  };

  /**
   * 跳转到用户协议页
   */
  goAgreementPage = () => {
    const { navigation } = this.props;
    navigation.navigate("Agreement");
  };

  render() {
    const { allowNext, sendCode, waitTime } = this.state;
    const {
      signupData: {
        school: { schoolName = "" },
        phone = "",
        code = "",
        password = "",
      },
    } = this.props;

    const { navigation } = this.props;
    return (
      <View style={styles.root}>
        <TopBack navigation={navigation} onPressBack={this.onPressBack} />
        <View style={styles.title}>
          <Text style={styles.titleText}>注册</Text>
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
            type="password"
            maxLength={16}
            labelNumber={6}
            value={password}
            onChange={value => {
              this.inputOnChange("password", value);
            }}
            placeholder="请输入密码（6-16位数字/字母）"
            style={styles.InputItem}
          />
        </View>

        <Button
          type="primary"
          disabled={!allowNext}
          style={styles.loginButton}
          onPress={this.goNext}
        >
          <Text style={styles.loginButtonText}>下一步</Text>
        </Button>

        <View style={styles.footer}>
          <Checkbox
            size={15}
            style={{
              marginRight: 7,
            }}
            onChange={checked => {
              this.setState({ agreement: checked });
            }}
          />
          <Text>继续即表示同意</Text>
          <TouchableOpacity onPress={this.goAgreementPage}>
            <Text style={styles.agreementText}>《隐私条款和用户协议》</Text>
          </TouchableOpacity>
        </View>

        <NavigationEvents
          onDidFocus={this.screenDidFocus}
          onWillBlur={this.screenWillBlur}
        />
      </View>
    );
  }
}

export default connect(({ signup }) => ({
  signupData: signup,
}))(SignupPage);
