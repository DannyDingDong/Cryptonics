import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundColor: "rgb(186, 104, 200)",
    marginBottom: "8rem",
  },
  bannerContent: {
    height: 500,
    display: "flex",
    flexDirection: "column",
    padding: 25,
    justifyContent: "space-around",
  },
  bannerHeading: {
    fontWeight: 700,
    fontSize: "2.5rem",
    marginBottom: 0,
    fontFamily: "Roboto, sans-serif",
    color: "#fff",
  },
  bannerDesc: {
    fontWeight: 100,
    fontFamily: "Roboto, sans-serif",
    color: "#fff",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography className={classes.bannerHeading}>TRENDING</Typography>
          <Typography className={classes.bannerDesc}>
            Check out the most popular coins of the week.
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
