import { createStyles } from "utils";
import {
  ColorPrimary,
  ColorBackgroundComp,
  ColorFontTitle,
  ColorFontBase,
  FontSizeTL,
} from "theme";

const styles = createStyles({
  root: {
    flex: 1,
    backgroundColor: ColorBackgroundComp,
    paddingHorizontal: 30,
  },
  title: {
    marginBottom: 16,
  },
  titleText: {
    fontSize: 20,
    color: ColorFontTitle,
    lineHeight: 28,
  },

  form: {
    marginLeft: -20,
  },
  InputItem: {
    fontSize: FontSizeTL,
    color: ColorFontBase,
  },
  school: {
    justifyContent: "center",
  },
  schoolIconView: {
    position: "absolute",
    right: 0,
  },

  code: {
    justifyContent: "center",
  },
  getCodeView: {
    position: "absolute",
    right: 0,
  },
  getCodeText: {
    fontSize: FontSizeTL,
    color: ColorFontBase,
  },

  loginButton: {
    marginTop: 40,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#007CFF",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: FontSizeTL,
  },

  footer: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  agreementText: {
    color: ColorPrimary,
  },
});

export default styles;
