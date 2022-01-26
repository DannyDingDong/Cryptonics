import { CircularProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import "chartjs-adapter-moment";

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchHistroicData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistroicData();
  }, [currency, days]);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "3rem",
      padding: "2.5rem",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: "1.2rem",
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const dateChecker = (chartDays) => {
    switch (chartDays) {
      case 1:
        return "hour";
        break;
      case 30:
        return "day";
        break;
      case 90:
        return "week";
        break;
      case 365:
        return "month";
        break;

      default:
    }
  };

  return (
    <div className={classes.container}>
      {/* Chart */}
      {!historicalData ? (
        <CircularProgress
          style={{ color: "rgb(186,104,200)" }}
          size={250}
          thickness={1}
        ></CircularProgress>
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                return date;
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days) in ${currency}`,
                  borderColor: "rgb(186,104,200)",
                  backgroundColor: "rgb(186,104,200)",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
              animation: false,

              scales: {
                x: {
                  type: "time",
                  distribution: "series",
                  time: {
                    unit: dateChecker(days),
                    displayFormats: {
                      quarter: "DD MMM",
                    },
                  },
                },
                y: {
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                      return symbol + value.toFixed(2);
                    },
                  },
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marinTop: "1.5rem",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
