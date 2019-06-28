import { createStyles } from "@cbd/utils-rn";
import * as theme from "theme";

export default createStyles({
  root: {},
  row: {
    justifyContent: "space-between",
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 52,
    backgroundColor: "#FFFFFF",
    borderBottomColor: theme.ColorCutting,
    borderBottomWidth: 1,
  },
});
