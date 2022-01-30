import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#fff",
    minHeight: "100vh",
  },
});
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/cryptonics" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
