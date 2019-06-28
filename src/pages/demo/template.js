import React from "react";
import { View, Text } from "react-native";

import { ColorFontBase, FontSizeLG } from "theme";

const Demo = ({ title, children }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: ColorFontBase, fontSize: FontSizeLG }}>
        {title}
      </Text>
      <View style={{ paddingTop: 8 }}>{children}</View>
    </View>
  );
};

export default Demo;
