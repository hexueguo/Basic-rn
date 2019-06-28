import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "components/Iconfont";
import userBackground from "assets/image/bg-personal.png";
import styles from "./styles";

class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false, // 用于控制头像，假如头像图片可正常显示，该值为false,否则该参数为true,显示为头像图标
    };
  }

  // 进入个人信息页面
  handleToInfo = () => {
    const { navigation, personData = {} } = this.props;
    navigation.navigate("PersonInfo", { personData });
  };

  // 头像加载错误时调用此函数
  handleError = () => {
    this.setState({
      isShow: true,
    });
  };

  render() {
    const { isShow } = this.state;
    const { personData = {} } = this.props;
    const {
      guardianName = "无数据",
      guardianPhoto = "无数据",
      userName = "无数据",
    } = personData;
    const x = userName.substring(3, 7);
    const values = userName !== "" ? userName.replace(x, "****") : "";
    // const values = userName.replace(x, "****");
    return (
      <View>
        <Image source={userBackground} style={{ width: "100%", height: 220 }} />
        <View style={styles.content}>
          <TouchableOpacity onPress={this.handleToInfo}>
            <View style={styles.root}>
              <View style={styles.center}>
                {!isShow && guardianPhoto !== "" && (
                  <Image
                    source={{ uri: guardianPhoto }}
                    style={styles.img}
                    onError={this.handleError}
                  />
                )}
                {(isShow || guardianPhoto === "") && (
                  <Icon
                    name="profile-photo"
                    type="icon"
                    size={67}
                    color="rgba(0,0,0, 0.20)"
                  />
                )}
                <Text style={styles.name}>{guardianName}</Text>
                <Text style={styles.phone}>{values}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Icon name="right" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyHeader;
