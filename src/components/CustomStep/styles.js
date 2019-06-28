import * as theme from "theme";
import { createStyles } from "@cbd/utils-rn";

const styles = {
  steps: { backgroundColor: "#FFFFFF", paddingTop: 10, marginBottom: 10 },
  stepOne: {
    flex: 1,
    marginHorizontal: 10,
  },
  stepHeader: {
    flexDirection: "row",
  },
  stepHeaderIcon: {
    width: 20,
    justifyContent: "center",
  },
  icon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    transform: [{ translateX: -4 }],
  },
  finishIcon: {
    backgroundColor: theme.ColorWarning,
  },
  waitIcon: {
    backgroundColor: "#ccc",
  },
  processIcon: {
    width: 18,
    height: 18,
    transform: [{ translateX: -9 }],
  },
  picon: {
    color: theme.ColorPrimary,
  },
  title: {
    fontSize: 14,
    color: theme.ColorFontTitle,
  },
  lightText: {
    color: theme.ColorPrimary,
  },
  line: {
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  stepDesc: {
    flexDirection: "row",
  },
  stepInfoWrapper: {
    paddingTop: 5,
    marginHorizontal: 20,
    flex: 1,
  },
  descInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepTitle: {
    fontSize: 14,
    color: theme.ColorFontTitle,
  },
  extraInfoContainer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: "#F4F6F8",
  },
  descText: {
    fontSize: 12,
    lineHeight: 18,
    color: theme.ColorFontDisable,
  },
  pic: {
    marginBottom: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default createStyles(styles);
