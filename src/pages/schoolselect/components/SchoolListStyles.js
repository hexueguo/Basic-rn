import { createStyles } from "utils";
import {
  ColorBackgroundComp,
  FontSizeMD,
  ColorFontBigTitle,
  FontSizeSM,
  ColorFontDisable,
} from "theme";

const styles = createStyles({
  root: {
    width: "100%",
    backgroundColor: ColorBackgroundComp,
    zIndex: 101,
  },

  schools: {
    marginLeft: 20,
  },
  school: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
  },
  schoolName: {
    fontSize: FontSizeMD,
    color: ColorFontBigTitle,
    lineHeight: 20,
    width: 160,
  },
  schoolAddr: {
    fontSize: FontSizeSM,
    color: ColorFontDisable,
    lineHeight: 16,
    width: 240,
  },
});

export default styles;
