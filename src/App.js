import React, { lazy, useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useWeb3Context, useAddress } from "./hooks";
import { useDispatch, useSelector } from "react-redux";
import { loadAppDetails } from "./store/slices/app-slice";
import { loadAccountDetails } from "./store/slices/account-slice";

const Home = lazy(() => import("./views/Home"));
const Inventory = lazy(() => import("./views/Inventory"));
const Mint = lazy(() => import("./views/Mint"));
const Merge = lazy(() => import("./views/Merge"));
const Stake = lazy(() => import("./views/Stake"));
const About = lazy(() => import("./views/About"));

//* In case the user is trying to log in an inexistant page, then redirect to the home page.
const NoMatch = lazy(() => import("./views/NoMatch"));

const App = () => {
  //? Clear localStorage for mobile users
  if (
    typeof localStorage.version_app === "undefined" ||
    localStorage.version_app !== "1.1"
  ) {
    localStorage.clear();
    localStorage.setItem("connectorId", "");
    localStorage.setItem("version_app", "1.1");
  }
  const dispatch = useDispatch();
  const { connect, provider, hasCachedProvider, chainID, connected } =
    useWeb3Context();
  const address = useAddress();
  const [walletChecked, setWalletChecked] = useState(false);
  const [apploaded, setApploaded] = useState(false);
  const isAppLoading = useSelector((state) => state.app.loading);

  async function loadDetails(whichDetails) {
    let loadProvider = provider;

    if (whichDetails === "app") {
      loadApp(loadProvider);
      setApploaded(true);
    }

    if (whichDetails === "account" && address && connected) {
      loadApp(loadProvider);
      loadAccount(loadProvider);
    }
  }

  const loadApp = useCallback(
    (loadProvider) => {
      dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
    },
    [connected]
  );

  const loadAccount = useCallback(
    (loadProvider) => {
      dispatch(
        loadAccountDetails({
          address,
          networkID: chainID,
          provider: loadProvider,
        })
      );
    },
    [connected]
  );

  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);

  useEffect(() => {
    if (walletChecked) {
      loadDetails("app");
      loadDetails("account");
    }
  }, [walletChecked]);

  useEffect(() => {
    if (connected) {
      loadDetails("app");
      loadDetails("account");
    }
  }, [connected]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Mint" element={<Mint />}></Route>
        <Route path="/Inventory" element={<Inventory />}></Route>
        <Route path="/Merge" element={<Merge />}></Route>
        <Route path="/Stake" element={<Stake />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
