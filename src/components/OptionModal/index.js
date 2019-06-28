import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Modal } from "@ant-design/react-native";

import { createStyles } from "@cbd/utils-rn";

import * as theme from "theme";

const { width: widthWindow = 200 } = Dimensions.get("window");

class OptionModal extends Component {
  render() {
    const {
      visible = false,
      onClose = () => {},
      select = () => {},
      option,
    } = this.props;

    const options = [
      {
        name: "爸爸",
        relationshipCode: "1",
      },
      {
        name: "妈妈",
        relationshipCode: "2",
      },
      {
        name: "爷爷",
        relationshipCode: "3",
      },
      {
        name: "奶奶",
        relationshipCode: "4",
      },
      {
        name: "外公",
        relationshipCode: "5",
      },
      {
        name: "外婆",
        relationshipCode: "6",
      },
    ];

    return (
      <Modal
        popup
        maskClosable
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
      >
        <View style={styles.root}>
          {options.map((item, index) => {
            const { name, relationshipCode } = item;
            return (
              <TouchableOpacity
                style={
                  option === relationshipCode ? styles.selected : styles.option
                }
                key={index}
                onPress={() => select(item)}
              >
                <Text
                  style={
                    option === relationshipCode ? styles.selectedText : null
                  }
                >
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    );
  }
}

export default OptionModal;

const styles = createStyles({
  root: {
    paddingHorizontal: 25,
    paddingVertical: 25,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    width: (widthWindow - 80) / 3,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 4,
    borderColor: theme.ColorCutting,
    borderWidth: 0.5,
  },
  selected: {
    width: (widthWindow - 80) / 3,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 4,
    borderWidth: 0.5,
    borderColor: theme.ColorPrimary,
    backgroundColor: "#F2F9FF",
  },
  selectedText: {
    color: theme.ColorPrimary,
  },
});
