import React, { Component } from "react";
import { View, Text, ImageBackground, Dimensions } from "react-native";
import demo from "assets/image/pho-1.png";

import styles from "./styles";

class ImgGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title = "", imgDatas = [] } = this.props;

    const { width: widthWindow = 200 } = Dimensions.get("window");

    return (
      <View style={styles.imgGroup}>
        {title && title.length > 0 ? (
          <Text style={{ marginVertical: 20 }}>{title}</Text>
        ) : null}
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            // justifyContent: "space-between",
          }}
        >
          {imgDatas.map((item, index) => {
            // const { fileId } = item;
            return (
              <ImageBackground
                source={demo}
                style={{
                  ...styles.pic,
                  width: (widthWindow - 100) / 4,
                  height: (widthWindow - 100) / 4,
                }}
                key={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default ImgGroup;
