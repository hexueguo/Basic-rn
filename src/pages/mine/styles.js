import { createStyles } from "utils/index";
import * as CSS from "theme/index";

const styles = {
  root: {},
  body: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  listText: {
    flexDirection: "row",
    alignItems: "center",
  },
  listRightText: {
    paddingLeft: 8,
    fontSize: CSS.FontSizeMD,
    color: "rgba(0,0,0,0.65)",
  },
};

export default createStyles(styles);
