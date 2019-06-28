import * as theme from "theme";
import { Dimensions, PixelRatio } from "react-native";
import { createStyles } from "@cbd/utils-rn";

const deviceWidth = Dimensions.get("window").width;

const styles = {
  divider: {
    width: deviceWidth,
    height: 1 / PixelRatio.get(),
    backgroundColor: "#D3D3D3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.ColorFontTitle,
  },
  linkText: {
    fontSize: 14,
    height: 50,
    lineHeight: 50,
    color: theme.ColorFontTitle,
  },
  pupUpTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    height: 50,
    lineHeight: 50,
    color: theme.ColorFontTitle,
  },
  selectItemText: {
    textAlign: "center",
    paddingVertical: 17,
    fontSize: 14,
    color: theme.ColorFontTitle,
  },
  checkedSelectItem: {
    color: theme.ColorPrimary,
  },
  itemContent: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 60,
    paddingVertical: 20,
  },
  itemRight: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
  },
  itemListTextBottom: {
    marginRight: 5,
    fontSize: 14,
    color: theme.ColorFontDisable,
  },
  datePickerWrapper: {
    paddingLeft: 5,
  },
  datePicker: {
    fontSize: 14,
    lineHeight: 50,
    color: theme.ColorFontTitle,
  },
};

export default createStyles(styles);
