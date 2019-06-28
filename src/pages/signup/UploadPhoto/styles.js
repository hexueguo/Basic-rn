import { createStyles } from "utils";
import {
  ColorPrimary,
  ColorBackgroundComp,
  ColorFontTitle,
  ColorFontBase,
  FontSizeTL,
  ColorFontDisable,
  FontSizeSM,
  FontSizeMD,
  FontSizeXS,
  ColorFontPlaceholder,
  ColorFontBigTitle,
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

  photo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photoUpload: {
    paddingHorizontal: 0,
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

  button: {
    marginTop: 40,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#007CFF",
  },
  buttonText: {
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

  Modal: {
    borderRadius: 10,
    paddingTop: 10,
  },
  ModalView: {},
  ModalImage: {
    alignItems: "center",
  },
  ModalImageView: {
    // position: "absolute",
    height: 86,
    width: 86,
    borderRadius: 43,
    backgroundColor: ColorBackgroundComp,
    borderWidth: 1,
    borderColor: "rgba(235, 235, 235,1)",
    alignItems: "center",
    justifyContent: "center",
    // top: -63,
  },
  ModalImageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  ModalFooterCancelText: {
    fontSize: FontSizeTL,
    color: ColorFontDisable,
  },
  ModalFooterConfirmText: {
    fontSize: FontSizeTL,
    color: ColorPrimary,
  },
  ModalTitleView: {
    marginTop: 15,
    // alignItems: "center",
  },
  ModalTitle: {
    fontSize: 18,
    color: ColorFontBigTitle,
  },
  babyInfo: {
    marginTop: 10,
    marginBottom: 6,
    display: "flex",
    flexDirection: "row",
  },
  circle: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: ColorPrimary,
    marginVertical: 9,
    marginRight: 6,
  },
  babyInfoText: {
    fontSize: 13,
    color: ColorFontBase,
    lineHeight: 22,
  },
  ModalDescription: {
    fontSize: FontSizeXS,
    color: ColorFontPlaceholder,
    marginBottom: 10,
  },
});

export default styles;
