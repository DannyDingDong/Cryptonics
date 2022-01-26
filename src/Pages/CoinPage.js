import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Banner/carousel";
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      marginTop: "3rem",
      // Media query
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "3rem",
      borderRight: "1px solid grey",
      fontFamily: "Roboto",
    },
    heading: {
      fontWeight: "regular",
      marginBottom: "1rem",
      fontFamily: "Roboto",
      fontSize: "1rem",
      color: "grey",
    },
    description: {
      width: "100%",
      fontFamily: "Roboto",
      padding: "1.5rem",
      paddingBottom: "1rem",
      paddingTop: "0",
      textAlign: "center",
      marginBottom: "0.5rem",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
    infoWrapper: {
      borderBottom: "1px solid grey",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "1rem",
      marginBottom: "0.5rem",
      [theme.breakpoints.down("md")]: {},
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      [theme.breakpoints.down("xs")]: {
        // alignItems: "start",
      },
    },
    infoNumbers: {
      fontSize: "1rem",
      color: "black",
    },
  }));

  const classes = useStyles();

  if (!coin)
    return <LinearProgress style={{ backgroundColor: "rgb(186,104,200)" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="150"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h4"
          style={{ fontWeight: "600", marginBottom: "1rem" }}
        >
          {coin?.name} ({coin?.symbol.toUpperCase()}){" "}
        </Typography>

        <Typography variant="subtitle1" className={classes.description}>
          {parse(`${coin?.description.en.split(". ")[0]}`)}.
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontSize: "1.8rem",
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          {symbol}
          {""}
          {numberWithCommas(
            coin?.market_data.current_price[currency.toLowerCase()].toFixed(2)
          )}
          <span
            style={
              coin?.market_data.price_change_percentage_24h > 0
                ? { color: "green", fontSize: "1rem", paddingLeft: "0.5rem" }
                : { color: "red", fontSize: "1rem", paddingLeft: "0.5rem" }
            }
          >
            {" "}
            {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
          </span>
        </Typography>
        <div className={classes.marketData}>
          <span className={classes.infoWrapper} style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:{""}
            </Typography>
            <Typography
              variant="h5"
              className={classes.infoNumbers}
              style={{ fontFamily: "Roboto" }}
            >
              {coin?.market_data.market_cap != null
                ? symbol +
                  numberWithCommas(
                    coin?.market_data.market_cap[
                      currency.toLowerCase()
                    ].toFixed(0)
                  )
                : "∞"}
            </Typography>
          </span>
          <span className={classes.infoWrapper} style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Total Supply:{""}
            </Typography>
            <Typography
              variant="h5"
              className={classes.infoNumbers}
              style={{ fontFamily: "Roboto" }}
            >
              {/* {symbol}
              {""}
              {numberWithCommas(coin?.market_data.total_supply.toFixed(0))} */}
              {coin?.market_data.total_supply != null
                ? symbol +
                  numberWithCommas(coin?.market_data.total_supply.toFixed(0))
                : "∞"}
            </Typography>
          </span>
          <span className={classes.infoWrapper} style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Max Supply:{""}
            </Typography>
            <Typography
              variant="h5"
              className={classes.infoNumbers}
              style={{ fontFamily: "Roboto" }}
            >
              {coin?.market_data.max_supply != null
                ? symbol +
                  numberWithCommas(coin?.market_data.max_supply.toFixed(0))
                : "∞"}
            </Typography>
          </span>
          <span className={classes.infoWrapper} style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Circulating Supply:{""}
            </Typography>
            <Typography
              variant="h5"
              className={classes.infoNumbers}
              style={{ fontFamily: "Roboto" }}
            >
              {/* {symbol}
              {""}
              {numberWithCommas(
                coin?.market_data.circulating_supply.toFixed(0)
              )} */}

              {coin?.market_data.circulating_supply != null
                ? symbol +
                  numberWithCommas(
                    coin?.market_data.circulating_supply.toFixed(0)
                  )
                : "∞"}
            </Typography>
          </span>
        </div>
      </div>

      {/* Chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
