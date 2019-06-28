import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Carousel, Toast, Portal } from "@ant-design/react-native";
import LinearGradient from "react-native-linear-gradient";
import QRCode from "react-native-qrcode";
import { dateFormat } from "utils/index";
import Icon from "components/Iconfont";
import bannerImg from "assets/image/banner.png";
import faceRecognition from "assets/image/face-recognition.png";
import styles from "./styles";

/**
 * 主页->二维码
 */
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQRCode: false, // 是否显示二维码
      QRCodeValue: "", // 二维码字符串
      time: "", // 当前时间
    };
  }

  /**
   * 开始识别,生成二维码
   */
  startRecognise = () => {
    const ToastKey = Toast.loading(false, 0);
    const { showQRCode } = this.state;
    if (!showQRCode) {
      // 根据用户id请求二维码字符串,并生成二维码
      // 判断是否有二维码字符串数据,如果没有则不显示二维码
      const date = new Date();
      // 时间格式化处理
      const time = dateFormat("yyyy/MM/dd hh:mm", date);

      this.setState({
        showQRCode: true,
        QRCodeValue: "测试demo", // 二维码字符串
        time,
      });
    } else {
      this.setState({
        showQRCode: false,
        QRCodeValue: "",
      });
    }
    Portal.remove(ToastKey);
  };

  render() {
    const { showQRCode, QRCodeValue, time } = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>智慧校园</Text>
          <View style={styles.headerIcon}>
            <TouchableOpacity>
              <Icon name="iconmore" type="icon" size={14} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
        <Carousel
          autoplay
          infinite
          style={styles.carousel}
          dotStyle={{
            top: 7,
            height: 6,
            width: 6,
          }}
          dotActiveStyle={styles.dotActiveStyle}
        >
          <View style={[styles.containerVertical]}>
            <Image source={bannerImg} style={styles.bannerImg} />
          </View>
          <View style={[styles.containerVertical]}>
            <Image source={bannerImg} style={styles.bannerImg} />
          </View>
          <View style={[styles.containerVertical]}>
            <Image source={bannerImg} style={styles.bannerImg} />
          </View>
        </Carousel>
        <View style={styles.content}>
          <View style={styles.faceRecognition}>
            {showQRCode ? (
              <QRCode value={QRCodeValue} size={160} bgColor="black" />
            ) : (
              <Image
                source={faceRecognition}
                style={styles.faceRecognitionImage}
              />
            )}
          </View>
          <Text style={styles.description}>
            {showQRCode ? time : "请人脸对准摄像头获取二维码"}
          </Text>
          <TouchableOpacity
            style={styles.buttonView}
            activeOpacity={0.6}
            onPress={this.startRecognise}
          >
            <LinearGradient
              colors={["#4698F0", "#3E68FC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>开始识别</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(({ home }) => ({
  homeData: home,
}))(HomePage);
