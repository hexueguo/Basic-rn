import { createStyles } from "utils";
import {
  ColorBackgroundComp,
  ColorFontTitle,
  ColorFontBase,
  FontSizeTL,
  FontSizeSM,
  FontSizeMD,
  ColorFontDisable,
  ColorFontPlaceholder,
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
  classInfo: {
    marginTop: 8,
    lineHeight: 17,
    fontSize: FontSizeSM,
    color: ColorFontDisable,
  },

  form: {
    marginLeft: -20,
  },
  InputItem: {
    fontSize: FontSizeTL,
    color: ColorFontBase,
    paddingRight: 0,
    marginRight: -10,
  },
  InputItemText: {
    fontSize: FontSizeTL,
    color: ColorFontBase,
  },
  InputItemIdentity: {
    fontSize: FontSizeTL,
    color: ColorFontBase,
  },
  identity: {
    justifyContent: "center",
  },
  identityIconView: {
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
  },
  footerText: {
    fontSize: FontSizeMD,
    color: ColorFontPlaceholder,
  },
});

export default styles;
