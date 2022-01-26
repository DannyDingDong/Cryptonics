import { React, useRef } from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
import { makeStyles, Typography, Container, Box } from "@material-ui/core";
import heroImage from "../assets/heroImage.svg";
import downChev from "../assets/downChevTwo.svg";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Homepage = () => {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const useStyles = makeStyles((theme) => ({
    container: {},
    heroWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    heading: {
      fontSize: "4.5rem",
      fontFamily: "Roboto",
      fontWeight: "bold",
      maxWidth: "20rem",
      textAlign: "left",
      lineHeight: "1.1",
      marginRight: "9rem",
      color: "black",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
        marginRight: "0rem",
        fontSize: "3.5rem",
        marginBottom: "5rem",
      },
    },
    heroPage: {
      marginTop: "12rem",
      paddingBottom: "15rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
      position: "relative",
    },
    heroImageStyle: {
      height: "25rem",
    },
    viewChartBtn: {
      position: "absolute",
      bottom: "3rem",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <section className={classes.heroPage}>
        <Container align="center" className={classes.container}>
          <Box className={classes.heroWrapper}>
            <Typography className={classes.heading}>
              TRACKING PRICES
              <span style={{ color: "rgb(192,128,209)" }}> CHANGING LIVES</span>
            </Typography>
            <Box>
              <img className={classes.heroImageStyle} src={heroImage} alt="" />
            </Box>
          </Box>
        </Container>

        <Box
          onClick={executeScroll}
          className={`${classes.viewChartBtn} bounce`}
        >
          <p
            style={{
              lineHeight: "1.6",
              letterSpacing: "-1px",
              color: "grey",
              fontWeight: "100",
              opacity: "0.8",
            }}
          >
            View Table
          </p>
          <img style={{ width: "1.8rem" }} src={downChev} alt="" />
        </Box>
      </section>
      <Banner />
      <div ref={myRef}>
        <CoinsTable />
      </div>
    </>
  );
};

export default Homepage;
