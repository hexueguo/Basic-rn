import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { InputItem, Button } from "@ant-design/react-native";
import { connect } from "react-redux";
import Icon from "components/Iconfont";
import TopBack from "components/TopBack";
import OptionModal from "components/OptionModal";
import styles from "./styles";

class BabyInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowNext: true, // 允许进行下一步
      optionVisible: false, // 身份菜单显示/隐藏  默认为false
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      signupData: { selectOption = "" },
    } = nextProps;
    // 判断是否都已输入/选择完成，允许点击下一步按钮
    if (selectOption && selectOption.length > 0) {
      return { ...state, allowNext: true };
    } else {
      return { ...state, allowNext: false };
    }
  }

  /**
   * 显示身份菜单
   */
  openOptionModal = () => {
    this.setState({ optionVisible: true });
  };

  /**
   *  身份菜单close回调
   */
  onOptionClose = () => {
    this.setState({ optionVisible: false });
  };

  /**
   *  身份菜单选择事件
   */
  optionSelect = value => {
    this.setState({ optionVisible: false }, () => {
      this.saveForm(value);
    });
  };

  /**
   * 将表单的身份数据保存到model中
   */
  saveForm = data => {
    const { dispatch } = this.props;
    const { name, relationshipCode } = data;
    dispatch({
      type: "signup/save/formValue",
      payload: {
        key: ["selectOption", "relationshipCode"],
        value: {
          selectOption: name,
          relationshipCode,
        },
      },
    });
  };

  /**
   * 跳转到下一步的页面->上传照片页
   */
  goNext = () => {
    const { navigation } = this.props;
    navigation.navigate("UploadPhoto");
  };

  render() {
    const { allowNext, optionVisible } = this.state;
    const {
      navigation,
      signupData: { babyInfo = {}, selectOption },
    } = this.props;
    const { babyClass = "", name = "", sex = "", birthday = "" } = babyInfo;
    return (
      <View style={styles.root}>
        <TopBack navigation={navigation} />
        <View style={styles.title}>
          <Text style={styles.titleText}>宝贝信息</Text>
          <Text style={styles.classInfo}>{`当前班级：${babyClass}`}</Text>
        </View>

        <View style={styles.form}>
          <InputItem
            value={name}
            style={styles.InputItem}
            editable={false}
            textAlign="right"
          >
            <Text style={styles.InputItemText}>姓名</Text>
          </InputItem>
          <InputItem
            value={sex === "1" ? "男" : "女"}
            style={styles.InputItem}
            editable={false}
            textAlign="right"
          >
            <Text style={styles.InputItemText}>性别</Text>
          </InputItem>
          <InputItem
            value={birthday}
            style={styles.InputItem}
            editable={false}
            textAlign="right"
          >
            <Text style={styles.InputItemText}>生日</Text>
          </InputItem>
          <TouchableOpacity
            style={styles.identity}
            activeOpacity={0.5}
            onPress={this.openOptionModal}
          >
            <InputItem
              value={selectOption}
              labelNumber={5}
              maxLength={5}
              editable={false}
              onChange={this.saveForm}
              placeholder="请选择身份"
              style={styles.InputItemIdentity}
              textAlign="right"
            >
              <Text style={styles.InputItemText}>我是宝贝的</Text>
            </InputItem>
            <View style={styles.identityIconView}>
              <Icon name="right" size={18} />
            </View>
          </TouchableOpacity>
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
          <Text style={styles.footerText}>
            认真核对宝贝信息，如有错误请联系老师！
          </Text>
        </View>
        <OptionModal
          visible={optionVisible}
          option={selectOption}
          onClose={this.onOptionClose}
          select={this.optionSelect}
        />
      </View>
    );
  }
}

export default connect(({ signup }) => ({
  signupData: signup,
}))(BabyInfoPage);
