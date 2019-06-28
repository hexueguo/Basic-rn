import { createStyles } from "utils/index";
import * as CSS from "theme/index";

const styles = {
  root: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  top: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: CSS.ColorCutting,
  },
  left: {
    fontSize: CSS.FontSizeMD,
    color: "rgba(0,0,0,0.65)",
  },
  right: { flexDirection: "row" },
  icon: { paddingTop: 25, paddingLeft: 10 },
  img: {
    width: 67,
    height: 67,
    borderRadius: 34,
  },
  iconText: { paddingTop: 15, paddingLeft: 10 },
  valueText: {
    textAlign: "right",
    fontSize: 14,
    color: "rgba(0,0,0,0.85)",
  },
};

export default createStyles(styles);
