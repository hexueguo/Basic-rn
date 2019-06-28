import { createStyles } from "@cbd/utils-rn";

import * as theme from "theme";

export default createStyles({
  imgRoot: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
    // marginHorizontal: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: {
    width: 150,
    height: 150,
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(221,221,221,1)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    // marginHorizontal: 5,
  },
  imgBotText: {
    fontSize: 12,
    marginTop: 8,
    color: theme.ColorFontPlaceholder,
  },
  closeBtn: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.ColorFontPlaceholder,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -8,
    right: -8,
    zIndex: 1000,
  },
});
