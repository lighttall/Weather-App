import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },

  paginate: {
    padding: "16px",
    marginTop: "1rem",
    borderRadius: 4,
  },

  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));
