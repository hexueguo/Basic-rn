import { createStyles } from "utils";

const styles = createStyles({
  root: {},
  container: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    padding: 15,
  },
  main: {
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainLeft: {
    flex: 1,
    flexDirection: "row",
  },
  mainLeftTitle: {
    fontSize: 16,
    color: "rgba(0,0,0,0.85)",
  },
  mainLeftType: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(247,88,66,1)",
    color: "#F75842",
    marginLeft: 10,
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  mainRight: {
    fontSize: 12,
    color: "rgba(0,0,0,0.45)",
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "rgba(0,0,0,0.45)",
    fontSize: 12,
    paddingBottom: 8,
    alignItems: "center",
  },
  contentDesc: {
    paddingLeft: 10,
  },
});

export default styles;
