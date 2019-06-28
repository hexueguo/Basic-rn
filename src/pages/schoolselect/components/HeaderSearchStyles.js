import { createStyles } from "utils";
// import {
//   FontSizeMD,
//   ColorFontBigTitle,
//   FontSizeSM,
//   ColorFontDisable,
// } from "theme";

const styles = createStyles({
  root: {
    zIndex: 101,
  },

  search: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F4F6F8",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 2,
  },
  iconView: {
    marginLeft: 17,
    marginRight: 0,
  },
  TextInput: {
    width: 240,
    height: 36,
    paddingVertical: 4,
  },
});

export default styles;
