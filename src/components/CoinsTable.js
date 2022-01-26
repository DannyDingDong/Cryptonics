import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  LinearProgress,
  TableContainer,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useNavigate } from "react-router";
import { numberWithCommas } from "./Banner/carousel";
import { makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles(() => ({
    row: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgb(246,246,246)",
      },
    },
  }));

  const classes = useStyles();

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <div ref={myRef}>
      <Container style={{ textAlign: "left" }}>
        <Typography
          style={{
            fontFamily: "Roboto",
            margin: "1rem 0rem",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "rgb(73,73,73)",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <Typography
          style={{
            fontFamily: "Roboto",
            margin: "1rem 0rem 3rem 0rem",
            fontSize: "1rem",
            fontWeight: 400,
            color: "rgb(73,73,73)",
          }}
        >
          The global cryptocurrency market tracked by a 24 hour change in
          pricing.
        </Typography>
        <TextField
          label="Search For a Crypto Currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
            setPage(1);
          }}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "rgb(186,104,200)" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "rgb(186,104,200)" }}>
                <TableRow>
                  {/* Mapping four fixed strings */}
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Roboto",
                      }}
                      key={head}
                      //   Gives coin header more space
                      align={head === "Coin" ? "inherit" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)

                  .map((row) => {
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          styles={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          ></img>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "1.1rem",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {""}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={
                            row.price_change_percentage_24h < 0
                              ? { color: "red", fontWeight: 500 }
                              : { color: "green", fontWeight: 500 }
                          }
                        >
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(row.market_cap.toFixed(0))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.Pagination }}
          count={parseInt((handleSearch().length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            executeScroll();
          }}
        ></Pagination>
      </Container>
    </div>
  );
};

export default CoinsTable;
