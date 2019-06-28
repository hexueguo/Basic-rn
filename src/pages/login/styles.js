import { createStyles } from "utils";
import { ColorBackground, FontSizeTL, ColorFontBase } from "theme";

const styles = createStyles({
  root: {
    flex: 1,
    backgroundColor: ColorBackground,
  },
  form: {
    marginTop: 40,
    marginLeft: 16,
    marginRight: 30,
  },
  InputItem: {
    fontSize: FontSizeTL,
    color: ColorFontBase,
  },
  InputItemText: {
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

  loginButton: {
    marginHorizontal: 30,
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
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  registered: {
    marginRight: 45,
  },
  forgetPw: {
    marginLeft: 45,
  },
  footerText: {
    fontSize: FontSizeTL,
    color: ColorFontBase,
  },
});

export default styles;
