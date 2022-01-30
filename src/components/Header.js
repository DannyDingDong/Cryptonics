import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  Select,
  makeStyles,
  Box,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "00000",
    fontFamily: "nats",
    fontWeight: "regular",
    cursor: "pointer",
    fontSize: "2rem",
  },
  selectStyle: {
    "&:before": {
      borderColor: "rgba(0,0,0,0)",
    },
    borderRadius: "0.5rem",
    background: "rgb(186, 104, 200)",
    fontFamily: "Roboto",
    border: "none",
    color: "white",
  },
}));

const Header = () => {
  const customStyles = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
            onClick={() => navigate("Cryptonics")}
            className={customStyles.title}
            variant="h6"
          >
            CRYP
            <Box component="span" sx={{ color: "#EF90FF" }}>
              TONICS
            </Box>
          </Typography>
          <Select
            variant="outlined"
            style={{ width: 90, height: 35, marginRight: 15 }}
            className={customStyles.selectStyle}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"GBP"}>GBP</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"JPY"}>JPY</MenuItem>
            <MenuItem value={"AUD"}>AUD</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
