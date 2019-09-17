import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Modal } from "@ant-design/react-native";
import { connect } from "react-redux";
import { clearUserInfo } from "utils/logout";
import { ColorPrimary, ColorFontBase, ColorFontDisable } from "theme";
import styles from "./styles";
import MyHeader from "./components/myHeader";
import ListItem from "./components/listItem";

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [
        {
          iconName: "help-use-book-o-copy",
          size: 13,
          text: "我的事件",
          goto: "MyEvent",
        },
        {
          iconName: "text-o",
          size: 13,
          text: "我的资讯",
          goto: "MyInfo",
        },
        {
          iconName: "me_contact-copy",
          size: 14,
          text: "建议反馈",
          goto: "FeedBack",
        },
        {
          iconName: "system-settings",
          size: 13,
          text: "系统设置",
          goto: "SystemSetting",
        },
        {
          iconName: "exit",
          size: 16,
          text: "退出登录",
          goto: this.handelShow,
        },
      ],
    };
  }

  componentDidMount() {
    // 默认获取第一页通知列表数据
    // this.getData();
  }

  getData = () => {
    const { dispatch } = this.props;
    const { userName = "" } = GLOBAL.userInfo;
    dispatch({
      type: "myCenter/personDataGet",
      payload: {
        userName, // 用户名
      },
    });
  };

  // 控制退出登录弹窗
  handelShow = () => {
    Modal.alert(
      <Text style={{ lineHeight: 70, color: ColorFontBase, fontSize: 18 }}>
        确认退出登录？
      </Text>,
      "",
      [
        {
          text: (
            <Text style={{ color: ColorFontDisable, fontSize: 18 }}>取消</Text>
          ),
        },
        {
          text: <Text style={{ color: ColorPrimary, fontSize: 18 }}>确定</Text>,
          onPress: this.handleLogOut,
        },
      ]
    );
  };

  // 确认退出登录
  handleLogOut = () => {
    clearUserInfo();
  };

  render() {
    const { navigation, myData = {} } = this.props;
    const { personData = {} } = myData;
    const { value } = this.state;
    return (
      <ScrollView>
        <MyHeader personData={personData} navigation={navigation} />
        <View style={styles.body}>
          {value.map((item, index) => (
            <ListItem
              key={index}
              iconName={item.iconName}
              size={item.size}
              text={item.text}
              goto={item.goto}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default connect(stores => ({
  myData: stores.myCenter,
}))(Mine);
