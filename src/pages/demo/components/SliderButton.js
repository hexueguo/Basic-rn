import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Dimensions,
} from "react-native";
import { Toast } from "@ant-design/react-native";
import Divider from "components/Divider";
import Icon from "components/Iconfont";
import TaskCard from "./TaskCard";
import styles from "./SliderButtonStyles";

const totalWidth = Dimensions.get("window").width - 40; // 按钮宽度（屏幕宽度-两侧的padding宽度）

class FooterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTaskInfo: false, // 是否显示任务信息
      leftPoint: 0, // 状态机变量用来保存最左边的卡槽
      startTask: false, // 用于判断滑动是否到最右边，即开始处理任务
    };

    this.watcher = null; // 监视器
    this.startX = 0; // 开始的左边

    this.watcher = PanResponder.create({
      // 建立监视器
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this._onPanResponderGrant, // 事件,按下
      onPanResponderMove: this._onPanResponderMove, // 移动
      onPanResponderEnd: this._onPanResponderEnd, // 结束
    });

    const { navigation } = props;
    navigation.addListener("didFocus", this.screenDidFocus);
  }

  screenDidFocus = () => {
    this.setState({
      leftPoint: 0,
      startTask: false,
    });
  };

  // 移动的逻辑
  _onPanResponderGrant = (e, gestureState) => {
    this.startX = gestureState.x0; // 按住滑块的时候,记录偏移量
  };

  _onPanResponderMove = (e, gestureState) => {
    // 记录滑动的偏移值
    const leftPoint = gestureState.moveX - this.startX - 20; // 20 -- 右滑图标左侧的padding宽度
    // 改变状态机到1的位置
    this.setState({ leftPoint });
  };

  /**
   * 手势结束
   */
  _onPanResponderEnd = (e, gestureState) => {
    // 滑动位置距离屏幕左侧的数值 大于 按钮宽度 则表示其滑完，并开始任务 20为冗余宽度
    if (gestureState.moveX > totalWidth - 20) {
      this.setState({ leftPoint: totalWidth, startTask: true }, () => {
        Toast.loading("开始处理任务！", 1);
      });
    } else {
      this.setState({ leftPoint: 0 });
    }
  };

  /**
   * 切换显示/隐藏任务信息
   */
  toggleTaskInfo = () => {
    const { isShowTaskInfo } = this.state;
    this.setState({
      isShowTaskInfo: !isShowTaskInfo,
    });
  };

  render() {
    const { isShowTaskInfo, leftPoint, startTask } = this.state;
    const { mapInfo = {}, taskInfo = {}, navigate = () => {} } = this.props;
    const { addr = "无数据", distance = 0, time = 0 } = mapInfo;

    return (
      <View style={styles.root}>
        <View style={styles.body}>
          <View style={styles.mapInfo}>
            <TouchableOpacity
              style={styles.iconTouchable}
              onPress={this.toggleTaskInfo}
            >
              <View style={styles.iconView} />
            </TouchableOpacity>
            <View />
            <View style={styles.info}>
              <View>
                <Text style={styles.addr}>{addr}</Text>
                <View style={styles.countNum}>
                  <Text style={{ ...styles.distance, ...styles.textStyle }}>
                    {`剩余${distance}m`}
                  </Text>
                  <Text style={styles.textStyle}>{`预计${time}分钟`}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.navigation}
                onPress={() => {
                  navigate();
                }}
              >
                <Icon
                  name="plane"
                  type="icon"
                  size={30}
                  color="rgba(0,0,0,0.45)"
                />
                <Text style={{ ...styles.textStyle, fontSize: 10 }}>
                  开启导航
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {isShowTaskInfo ? (
            <View style={styles.taskView}>
              <TaskCard taskInfo={taskInfo} />
            </View>
          ) : null}
          <View style={styles.viewDivider}>
            <Divider />
          </View>
          <View style={styles.buttonView}>
            <View style={styles.button}>
              <View style={styles.animation}>
                <View
                  style={
                    startTask
                      ? {
                          ...styles.panHandleView,
                          width: leftPoint,
                          borderRadius: 2,
                        }
                      : {
                          ...styles.panHandleView,
                          width: leftPoint,
                        }
                  }
                >
                  {startTask ? (
                    <Icon name="check" color="#FFFFFF" size={20} />
                  ) : null}
                </View>
                {!startTask ? (
                  <View
                    {...this.watcher.panHandlers}
                    style={
                      leftPoint < 1 // 开始滑动
                        ? [styles.buttonIcon, { left: leftPoint }]
                        : [
                            styles.buttonIcon,
                            { left: leftPoint, backgroundColor: "#2DD07C" },
                          ]
                    }
                  >
                    <Icon name="right" color="#FFFFFF" size={18} />
                  </View>
                ) : null}
              </View>
              <View style={styles.textView}>
                <Text style={styles.buttonText}>滑动开始处理任务</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default FooterMenu;
