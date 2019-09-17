import React, { Component } from "react";
import { View, Text, PanResponder } from "react-native";
import { Toast } from "@ant-design/react-native";
import Icon from "components/Iconfont";
import { measureRef } from "utils";
import styles from "./SliderButtonStyles";

let buttonWidth = 0; // 按钮宽度

class FooterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPoint: 0, // 状态机变量用来保存最左边的卡槽
      startTask: false, // 用于判断滑动是否到最右边，即开始滑动
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

  componentDidMount() {
    // 动态获取按钮的宽度,需要延迟，不然无法获取到
    setTimeout(() => {
      measureRef(this.ref).then(res => {
        const { width } = res;
        buttonWidth = width;
      });
    }, 100);
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
    const leftPoint = gestureState.moveX - this.startX; // 20 -- 右滑图标左侧的padding宽度
    // console.log("leftPoint", leftPoint);
    // console.log("buttonWidth", buttonWidth);
    // console.log("gestureState.moveX", gestureState.moveX);
    if (gestureState.moveX < buttonWidth) {
      this.setState({ leftPoint });
    } else {
      // 改变状态机到1的位置
      this.setState({ leftPoint: buttonWidth });
    }
  };

  /**
   * 手势结束
   */
  _onPanResponderEnd = (e, gestureState) => {
    // 滑动位置距离屏幕左侧的数值 大于 按钮宽度 则表示其滑完，并开始任务 20为冗余宽度
    if (gestureState.moveX > buttonWidth - 20) {
      this.setState({ leftPoint: buttonWidth, startTask: true }, () => {
        Toast.loading("开始处理任务！", 1);
      });
    } else {
      this.setState({ leftPoint: 0 });
    }
  };

  render() {
    const { leftPoint, startTask } = this.state;
    const { buttonText = "滑动开始" } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.body}>
          <View
            style={styles.buttonView}
            ref={ref => {
              this.ref = ref;
            }}
          >
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
                    <Icon name="double-right" color="#FFFFFF" size={18} />
                  </View>
                ) : null}
              </View>
              <View style={styles.textView}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default FooterMenu;
