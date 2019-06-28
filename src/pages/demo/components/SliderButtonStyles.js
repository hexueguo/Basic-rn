import { createStyles } from "utils";
import {
  ColorBackground,
  ColorBackgroundComp,
  ColorFontPlaceholder,
  ColorFontTitle,
  ColorFontDisable,
  FontSizeMD,
} from "theme";

const styles = createStyles({
  root: {
    // height: 210,
    width: "100%",
    backgroundColor: ColorBackground,
    // position: "absolute",
    bottom: 0,
    zIndex: 100,
  },
  body: {},
  mapInfo: {
    paddingHorizontal: 20,
    height: 100,
    width: "100%",
    backgroundColor: ColorBackgroundComp,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 14,
  },
  addr: {
    width: 260,
    fontSize: 18,
    color: ColorFontTitle,
    marginBottom: 4,
  },
  countNum: {
    display: "flex",
    flexDirection: "row",
  },
  textStyle: {
    fontSize: FontSizeMD,
    color: ColorFontDisable,
  },
  distance: {
    paddingRight: 10,
  },

  navigation: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconTouchable: {
    alignItems: "center",
  },
  iconView: {
    width: 35,
    height: 5,
    backgroundColor: ColorFontPlaceholder,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 9,
  },
  taskView: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: ColorBackgroundComp,
  },
  viewDivider: {
    paddingHorizontal: 20,
    backgroundColor: ColorBackgroundComp,
    paddingBottom: 14,
  },

  buttonView: {
    height: 130,
    paddingHorizontal: 20,
    backgroundColor: ColorBackgroundComp,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#3272FF",
    borderRadius: 2,
    zIndex: 102,
  },
  animation: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  panHandleView: {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    height: 48,
    backgroundColor: "#2DD07C",
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 48,
    zIndex: 1000,
  },
  textView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: ColorBackgroundComp,
  },
});

export default styles;
