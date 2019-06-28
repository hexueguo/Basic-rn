/* eslint-disable  */
import React, { Component } from "react";
import {
  StyleSheet,
  PanResponder,
  View,
  Text,
  Dimensions,
  I18nManager,
} from "react-native";
import PropTypes from "prop-types";
import Line from "./line";
import * as helper from "./helper";
import Circle from "./circle";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
const isVertical = Height > Width;
const Top = isVertical ? ((Height - Width) / 2.0) * 1.25 : 10;
const Radius = isVertical ? Width / 10 : Width / 25;

export default class GesturePassword extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.lastIndex = -1;
    this.sequence = ""; // 手势结果
    this.isMoving = false;

    // getInitialState
    const circles = [];
    const Margin = Radius;
    for (let i = 0; i < 9; i++) {
      const p = i % 3;
      const q = parseInt(i / 3);
      circles.push({
        isActive: false,
        x: p * (Radius * 2 + Margin) + Margin + Radius,
        y: q * (Radius * 2 + Margin) + Margin + Radius,
      });
    }

    this.state = {
      circles,
      lines: [],
      message: "",
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      // 开始手势操作
      onPanResponderGrant: (event, gestureState) => {
        this.onStart(event, gestureState);
      },
      // 移动操作
      onPanResponderMove: (event, gestureState) => {
        this.onMove(event, gestureState);
      },
      // 释放手势
      onPanResponderRelease: (event, gestureState) => {
        this.onEnd(event, gestureState);
      },
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onStart(e, g) {
    let x = isVertical
      ? e.nativeEvent.pageX
      : e.nativeEvent.pageX - Width / 3.4;
    let y = isVertical
      ? e.nativeEvent.pageY - Top / 1.25
      : e.nativeEvent.pageY - 30;

    let lastChar = this.getTouchChar({ x, y });
    if (lastChar) {
      this.isMoving = true;
      this.lastIndex = Number(lastChar);
      this.sequence = lastChar;
      this.resetActive();
      this.setActive(this.lastIndex);

      let point = {
        x: this.state.circles[this.lastIndex].x,
        y: this.state.circles[this.lastIndex].y,
      };

      this.refs.line.setNativeProps({ start: point, end: point });

      this.props.onStart && this.props.onStart();

      if (this.props.interval > 0) {
        clearTimeout(this.timer);
      }
    }
  }

  onMove(e, g) {
    let x = isVertical
      ? e.nativeEvent.pageX
      : e.nativeEvent.pageX - Width / 3.4;
    let y = isVertical
      ? e.nativeEvent.pageY - Top / 1.25
      : e.nativeEvent.pageY - 30;

    if (this.isMoving) {
      this.refs.line.setNativeProps({ end: { x, y } });

      let lastChar = null;

      if (
        !helper.isPointInCircle(
          { x, y },
          this.state.circles[this.lastIndex],
          Radius
        )
      ) {
        lastChar = this.getTouchChar({ x, y });
      }

      if (lastChar && this.sequence.indexOf(lastChar) === -1) {
        if (!this.props.allowCross) {
          let crossChar = this.getCrossChar(lastChar);

          if (crossChar && this.sequence.indexOf(crossChar) === -1) {
            this.sequence += crossChar;
            this.setActive(Number(crossChar));
          }
        }

        let lastIndex = this.lastIndex;
        let thisIndex = Number(lastChar);

        this.state.lines.push({
          start: {
            x: this.state.circles[lastIndex].x,
            y: this.state.circles[lastIndex].y,
          },
          end: {
            x: this.state.circles[thisIndex].x,
            y: this.state.circles[thisIndex].y,
          },
        });

        this.lastIndex = Number(lastChar);
        this.sequence += lastChar;

        this.setActive(this.lastIndex);

        let point = {
          x: this.state.circles[this.lastIndex].x,
          y: this.state.circles[this.lastIndex].y,
        };

        this.refs.line.setNativeProps({ start: point });
      }
    }

    if (this.sequence.length === 9) this.onEnd();
  }

  onEnd(e, g) {
    if (this.isMoving) {
      let password = helper.getRealPassword(this.sequence);
      this.sequence = "";
      this.lastIndex = -1;
      this.isMoving = false;

      let origin = { x: 0, y: 0 };
      this.refs.line.setNativeProps({ start: origin, end: origin });

      this.props.onEnd && this.props.onEnd(password);

      if (this.props.interval > 0) {
        this.timer = setTimeout(() => this.resetActive(), this.props.interval);
      }
    }
  }

  getCrossChar(char) {
    let middles = "13457",
      last = String(this.lastIndex);

    if (middles.indexOf(char) > -1 || middles.indexOf(last) > -1) return false;

    let point = helper.getMiddlePoint(
      this.state.circles[last],
      this.state.circles[char]
    );

    for (let i = 0; i < middles.length; i++) {
      let index = middles[i];
      if (helper.isEquals(point, this.state.circles[index])) {
        return String(index);
      }
    }

    return false;
  }

  getTouchChar(touch) {
    let x = touch.x;
    let y = touch.y;

    for (let i = 0; i < 9; i++) {
      if (helper.isPointInCircle({ x, y }, this.state.circles[i], Radius)) {
        return String(i);
      }
    }

    return false;
  }

  setActive(index) {
    this.state.circles[index].isActive = true;

    let circles = this.state.circles;
    this.setState({ circles });
  }

  resetActive() {
    this.state.lines = [];
    for (let i = 0; i < 9; i++) {
      this.state.circles[i].isActive = false;
    }

    let circles = this.state.circles;
    this.setState({ circles });
    this.props.onReset && this.props.onReset();
  }

  renderLines() {
    let array = [],
      color;
    let { status, wrongColor, rightColor, transparentLine } = this.props;

    this.state.lines.forEach(function(l, i) {
      color = status === "wrong" ? wrongColor : rightColor;
      color = transparentLine ? "#00000000" : color;

      array.push(
        <Line key={"l_" + i} color={color} start={l.start} end={l.end} />
      );
    });

    return array;
  }

  renderCircles() {
    let array = [],
      fill,
      color,
      outsideColor,
      inner,
      outer;

    let {
      status,
      normalColor,
      wrongColor,
      rightColor,
      innerCircle,
      outerCircle,
      wrongOutsideColor,
      righOutsideColor,
    } = this.props;

    this.state.circles.forEach(function(c, i) {
      fill = c.isActive;
      color = status === "wrong" ? wrongColor : rightColor;
      outsideColor = status === "wrong" ? wrongOutsideColor : righOutsideColor;

      inner = !!innerCircle;
      outer = !!outerCircle;

      array.push(
        <Circle
          key={"c_" + i}
          fill={fill}
          normalColor={normalColor}
          color={color}
          outsideColor={outsideColor}
          x={c.x}
          y={c.y}
          r={Radius}
          inner={inner}
          outer={outer}
        />
      );
    });

    return array;
  }

  render() {
    const { message: messageState } = this.state;
    const {
      status,
      wrongColor,
      rightColor,
      style,
      textStyle,
      message,
      transparentLine,
      children,
    } = this.props;

    const color = status === "wrong" ? wrongColor : rightColor;

    return (
      <View style={[styles.frame, style, { flex: 1 }]}>
        <View style={styles.message}>
          <Text style={[styles.msgText, textStyle, { color }]}>
            {messageState || message}
          </Text>
        </View>
        <View style={styles.board} {...this._panResponder.panHandlers}>
          {this.renderCircles()}
          {this.renderLines()}
          <Line ref="line" color={transparentLine ? "#00000000" : color} />
        </View>

        {children}
      </View>
    );
  }
}

GesturePassword.propTypes = {
  message: PropTypes.string,
  normalColor: PropTypes.string,
  rightColor: PropTypes.string,
  righOutsideColor: PropTypes.string,
  wrongColor: PropTypes.string,
  wrongOutsideColor: PropTypes.string,
  status: PropTypes.oneOf(["right", "wrong", "normal"]),
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  onReset: PropTypes.func,
  interval: PropTypes.number,
  allowCross: PropTypes.bool,
  innerCircle: PropTypes.bool,
  outerCircle: PropTypes.bool,
};

GesturePassword.defaultProps = {
  message: "",
  normalColor: "#007CFF",
  righOutsideColor: "rgba(0,124,255,0.30)",
  rightColor: "#007CFF",
  // righOutsideColor: "rgba(0,124,255,0.30)",
  wrongColor: "#E8495A",
  wrongOutsideColor: "#FBEFF1",
  status: "normal",
  interval: 0,
  allowCross: false,
  innerCircle: true,
  outerCircle: true,
};

const styles = StyleSheet.create({
  frame: {
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
    backgroundColor: "#292B38",
  },
  board: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    position: "absolute",
    left: isVertical ? 0 : Width / 3.4,
    top: isVertical ? Top / 1.5 : 30,
    width: Width,
    height: Height,
  },
  message: {
    position: "absolute",
    left: 0,
    top: 40,
    width: Width,
    height: Top / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  msgText: {
    fontSize: 16,
  },
});

module.exports = GesturePassword;
