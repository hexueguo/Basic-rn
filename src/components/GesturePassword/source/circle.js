import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

export default class Circle extends Component {
  render() {
    const {
      color,
      outsideColor,
      normalColor,
      fill,
      x,
      y,
      r,
      inner,
      outer,
    } = this.props;

    return (
      <View
        style={[
          styles.outer,
          {
            left: x - r,
            top: y - r,
            width: 2 * r,
            height: 2 * r,
            borderRadius: r,
          },
          { borderColor: normalColor },
          fill && { borderColor: color },
          !outer && { borderWidth: 0 },
        ]}
      >
        {/* 开始滑动显示的内圈效果 (无外圈 且 active时，显示当前View) */}
        {inner && !outer && fill && (
          <View
            style={{
              width: 2 * r - 2,
              height: 2 * r - 2,
              borderRadius: r - 1,
              backgroundColor: outsideColor,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {inner && (
              <View
                style={[
                  {
                    width: (2 * r) / 3,
                    height: (2 * r) / 3,
                    borderRadius: r / 3,
                    backgroundColor: "rgba(255, 255, 255, 0)",
                  },
                  !outer && styles.inner,
                  fill && { backgroundColor: color },
                ]}
              />
            )}
          </View>
        )}

        {/* 初始化显示内圈效果 (有外圈 或 active时，显示当前View) */}
        {inner && (outer || !fill) && (
          <View
            style={[
              {
                width: (2 * r) / 3,
                height: (2 * r) / 3,
                borderRadius: r / 3,
                backgroundColor: "rgba(255, 255, 255, 0)",
              },
              !outer && styles.inner, // 没有外圈时，内圈的颜色
              fill && { backgroundColor: color },
            ]}
          />
        )}
      </View>
    );
  }
}

Circle.propTypes = {
  //   color: PropTypes.string,
  //   fill: PropTypes.bool,
  //   x: PropTypes.number,
  //   y: PropTypes.number,
  //   r: PropTypes.number,
  inner: PropTypes.bool,
  outer: PropTypes.bool,
};

Circle.defaultProps = {
  inner: true,
  outer: true,
};

const styles = StyleSheet.create({
  outer: {
    position: "absolute",
    borderColor: "#8E91A8",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    backgroundColor: "#C4CFE1",
  },
});

module.exports = Circle; // for compatible with require only
