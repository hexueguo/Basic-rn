import { createStyles } from "@cbd/utils-rn";
import { ColorCutting } from "theme";

const styles = {
  root: {
    width: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 20,
    borderBottomColor: ColorCutting,
    borderBottomWidth: 1,
  },
  left: {
    width: "20%",
  },
  mid: {
    flex: 1,
    // width: "33%",
    alignItems: "center",
  },
  right: {
    width: "20%",
    alignItems: "flex-end",
  },
};

export default createStyles(styles);
