import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "components/Iconfont";
import styles from "./TaskCardStyles";

class TaskCard extends Component {
  render() {
    const { taskInfo = {} } = this.props;
    const {
      title = "",
      type = 1,
      classify = "",
      code = "暂无数据",
      address = "暂无数据",
      time = "暂无数据",
      // backup = "暂无数据",
    } = taskInfo;

    const iconProps = {
      size: 14,
      color: "rgba(0,0,0,0.45)",
    };

    return (
      <View style={styles.root}>
        <View style={styles.main}>
          <View style={styles.mainLeft}>
            <Text style={styles.mainLeftTitle}>{title}</Text>
            {type === 0 ? <Text style={styles.mainLeftType}>紧急</Text> : null}
          </View>
          <Text style={styles.mainRight}>{classify}</Text>
        </View>
        <View style={styles.content}>
          <Icon name="profile" {...iconProps} />
          <Text style={styles.contentDesc}>{code}</Text>
        </View>
        <View style={styles.content}>
          <Icon name="profile" {...iconProps} />
          <Text style={styles.contentDesc}>{address}</Text>
        </View>
        <View style={styles.content}>
          <Icon name="profile" {...iconProps} />
          <Text style={styles.contentDesc}>{time}</Text>
        </View>
        {/* <View style={styles.content}>
          <Icon name="infocirlce" {...iconProps} />
          <Text style={styles.contentDesc}>{backup}</Text>
        </View> */}
      </View>
    );
  }
}

export default TaskCard;
