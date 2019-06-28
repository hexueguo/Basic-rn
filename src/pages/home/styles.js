import { createStyles } from "utils";
import {
  ColorBackground,
  ColorBackgroundComp,
  FontSizeTL,
  FontSizeSM,
  ColorFontBigTitle,
  // ColorPrimary,
  ColorFontDisable,
} from "theme";

const styles = {
  root: {
    flex: 1,
    backgroundColor: ColorBackground,
  },

  header: {
    backgroundColor: ColorBackgroundComp,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FontSizeTL,
    color: ColorFontBigTitle,
  },
  headerIcon: {
    position: "absolute",
    right: 20,
  },

  faceRecognition: {
    marginTop: 35,
  },
  faceRecognitionImage: {
    width: 160,
    height: 160,
  },

  carousel: {
    height: 180,
  },
  dotActiveStyle: {
    width: 12,
    height: 4,
    backgroundColor: ColorBackgroundComp,
    position: "relative",
    top: 8,
    // marginHorizontal: 16,
  },
  bannerImg: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },

  content: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: ColorBackgroundComp,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginTop: 20,
    marginBottom: 24,
    fontSize: FontSizeSM,
    color: ColorFontDisable,
  },

  buttonView: {
    width: "100%",
    paddingHorizontal: 22,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    // backgroundColor: ColorPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: FontSizeTL,
    color: "#FFFFFF",
  },
};

export default createStyles(styles);
