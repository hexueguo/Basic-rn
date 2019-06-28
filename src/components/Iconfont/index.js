import React from "react";
import { Icon as AntdIcon } from "@ant-design/react-native";
import { Text } from "react-native";
import Unicode from "./unicode";

/**
 * 图标库前缀
 */
const prefix = "village-";

class Icon extends React.Component {
  render() {
    const { name, type = "antd" } = this.props;
    const content = Unicode[prefix + name];
    const typeString = content ? content.content : "";
    if (type === "antd") {
      return <AntdIcon type={typeString} {...this.props} />;
    } else if (type === "icon") {
      const { size, color } = this.props;
      const sizeMap = {
        xxs: 15,
        xs: 18,
        sm: 21,
        md: 22,
        lg: 36,
      };
      const fontSize = typeof size === "string" ? sizeMap[size] : size;
      return (
        <Text
          style={{
            fontFamily: "iconfont",
            fontSize,
            color,
          }}
        >
          {typeString}
        </Text>
      );
    }
  }
}

export default Icon;
