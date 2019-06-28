import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "components/Iconfont";

import styles from "./styles";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { avatarSource: [] };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { avatarSource = [] } = nextProps;
    return {
      ...prevState,
      avatarSource,
    };
  }

  render() {
    const { avatarSource = [] } = this.state;
    const {
      delImg = () => {},
      chooseImage = () => {},
      style = {}, // 自定义组件root样式
      imgStyle = {}, // 自定义组件选择的图片样式
      uploadIconStyle = {}, // 自定义组件图标的外框样式
      uploadIconText = "代接送人员正面照", // 自定义文字说明
    } = this.props;

    return (
      <View style={{ ...styles.imgRoot, ...style }}>
        {avatarSource.length > 0
          ? avatarSource.map((item, index) => {
              return (
                <ImageBackground
                  key={index}
                  source={item}
                  style={{ ...styles.img, ...imgStyle }}
                >
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => {
                      delImg(index);
                    }}
                  >
                    <Icon name="close" size={12} color="#FFFFFF" />
                  </TouchableOpacity>
                </ImageBackground>
              );
            })
          : null}

        {avatarSource.length === 0 ? (
          <TouchableOpacity onPress={() => chooseImage()}>
            <View style={{ ...styles.uploadIcon, ...uploadIconStyle }}>
              <Icon
                type="icon"
                name="home-add-copy"
                size={24}
                color="#999999"
              />
              <Text style={styles.imgBotText}>{uploadIconText}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export default Upload;
