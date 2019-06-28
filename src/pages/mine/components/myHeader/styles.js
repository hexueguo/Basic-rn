import { createStyles } from "utils/index";
import * as CSS from "theme/index";

const styles = {
  content: {
    width: "100%",
    marginTop: 16,
    position: "absolute",
  },
  root: {
    flex: 1,
    alignItems: "center",
  },
  rootBack: {
    width: "100%",
    height: 220,
  },
  img: {
    width: 67,
    height: 67,
    borderRadius: 34,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#fff",
  },
  phone: {
    fontSize: CSS.FontSizeMD,
    color: "rgba(255,255,255, 0.85)",
  },
  left: {
    width: 10,
    height: 10,
  },
  center: {
    paddingTop: 33,
    alignItems: "center",
  },
  right: {
    position: "absolute",
    right: 20,
    top: 90,
  },
};

export default createStyles(styles);
