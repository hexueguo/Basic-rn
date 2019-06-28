import { createStyles } from "utils";
import { FontSizeTL, ColorFontDisable, ColorBackgroundComp } from "theme";

const styles = createStyles({
  root: {
    flex: 1,
  },

  header: {
    width: "100%",
    backgroundColor: ColorBackgroundComp,
  },
  TopNavBarLeft: {
    fontSize: FontSizeTL,
    color: ColorFontDisable,
  },

  Map: {
    flex: 1,
    position: "relative",
  },
  MapView: {
    flex: 1,
    position: "relative",
  },
  MapLocation: {
    zIndex: 100,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  MapLocationView: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(235, 235, 235, 0.5)",
  },
});

export default styles;
