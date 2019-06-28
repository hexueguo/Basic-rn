import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { isEquals, getTransform } from "./helper";

export default class Line extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props };
  }

  componentWillReceiveProps(nextProps) {
    const { color } = this.props;
    if (nextProps.color !== color) {
      this.setState({ color: nextProps.color });
    }
  }

  setNativeProps(props) {
    this.setState(props);
  }

  render() {
    const { start, end, transparentLine } = this.state;
    let { color } = this.state;

    if (isEquals(start, end)) return null;

    const transform = getTransform(start, end);
    const length = transform.d;
    const angle = `${transform.a}rad`;
    const moveX = transform.x;
    const moveY = transform.y;

    // for transparent line
    color = transparentLine ? "#00000000" : color;

    return (
      <View
        // eslint-disable-next-line
        ref="line"
        style={[
          styles.line,
          {
            backgroundColor: color,
            left: start.x,
            top: start.y,
            width: length,
          },
          {
            transform: [
              { translateX: moveX },
              { translateY: moveY },
              { rotateZ: angle },
            ],
          },
        ]}
      />
    );
  }
}

Line.propTypes = {
  color: PropTypes.string,
  start: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  end: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

Line.defaultProps = {
  color: "#8E91A8",
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
};

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    height: 3,
  },
});

module.exports = Line; // for compatible with require only
