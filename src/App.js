import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
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
    <HashRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
