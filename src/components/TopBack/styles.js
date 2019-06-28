import { createStyles } from "@cbd/utils-rn";
import { ColorBackgroundComp, FontSizeTL, ColorFontTitle } from "theme";

const styles = {
  root: {
    width: "100%",
    backgroundColor: ColorBackgroundComp,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
  },

  leftDisplay: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  leftText: { fontSize: FontSizeTL, color: ColorFontTitle },
};

export default createStyles(styles);
