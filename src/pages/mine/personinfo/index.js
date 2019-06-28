import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import TopNavBar from "components/TopNavBar";
import Icon from "components/Iconfont";
import styles from "./styles";

class PersonInfo extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const { params = {} } = navigation.state;
    const { personData = {} } = params;
    const {
      guardianName = "",
      guardianPhoto = "",
      homeAddress = "",
    } = personData;
    this.state = {
      hasErrorName: false, // 用于姓名错误显示
      hasErrorAddr: false, // 用于家庭地址错误显示
      sourceUrl: guardianPhoto, // 头像
      name: guardianName, // 姓名
      address: homeAddress, // 家庭地址
      isShow: false, // 用于控制头像，假如头像图片可正常显示，该值为false,否则该参数为true,显示为头像图标
    };
  }

  // 头像加载错误时调用此函数
  handleError = () => {
    this.setState({
      isShow: true,
    });
  };

  render() {
    const {
      hasErrorName,
      name,
      hasErrorAddr,
      address,
      isShow,
      sourceUrl,
    } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView>
        <TopNavBar midText="个人信息" navigation={navigation} />
        <View style={styles.root}>
          <TouchableOpacity style={styles.top}>
            <View>
              <Text style={styles.left}>头像</Text>
            </View>
            <View style={styles.right}>
              {!isShow && sourceUrl !== "" && (
                <Image
                  source={{ uri: sourceUrl }}
                  style={styles.img}
                  onError={this.handleError}
                />
              )}
              {(isShow || sourceUrl === "") && (
                <Icon
                  name="profile-photo"
                  type="icon"
                  size={67}
                  color="rgba(0,0,0, 0.25)"
                />
              )}
              <View style={styles.icon}>
                <Icon name="right" size={16} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.top}>
            <View>
              <Text style={styles.left}>姓名</Text>
            </View>
            <View style={styles.right}>
              <TextInput
                placeholder="请输入姓名"
                error={hasErrorName}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange}
                value={name}
                style={styles.valueText}
              />
              <View style={styles.iconText}>
                <Icon name="right" size={16} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.top}>
            <View>
              <Text style={styles.left}>家庭地址</Text>
            </View>
            <View style={styles.right}>
              <TextInput
                placeholder="请输入家庭地址"
                error={hasErrorAddr}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange}
                value={address}
                style={styles.valueText}
              />
              <View style={styles.iconText}>
                <Icon name="right" size={16} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default PersonInfo;
