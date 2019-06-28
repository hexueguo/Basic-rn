import React from "react";
import { NavigationEvents } from "react-navigation";

const throttleTime = 500;

class EmptyRouter extends React.Component {
  constructor(props) {
    super(props);
    this.timer = setInterval(() => {
      const { navigation } = this.props;
      if (navigation && navigation.isFocused()) {
        this.goBack("timer");
      }
    }, 300);
    this.lastTime = 0;
  }

  goBack = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    const { navigation } = this.props;
    const currentTime = new Date().getTime();
    if (navigation && navigation.pop && throttleTime < currentTime - this.lastTime) {
      this.lastTime = currentTime;
      navigation.pop();
    }
  };

  render() {
    return (
      <NavigationEvents onWillFocus={() => {
        this.goBack("willFocus");
      }}
      />
    );
  }
};

export default EmptyRouter;
