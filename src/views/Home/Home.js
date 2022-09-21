import React, { useEffect, useState, useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { ConnectKitButton } from "connectkit";

import { Link } from "react-router-dom";
import { getOffsetLeft } from "@mui/material";
import ConnetButton from "../../components/connect-button";
import { useWeb3Context } from "../../hooks";

const HomeTree = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background-color: #000000;
  border-radius: 26px;
`;

const TreeButtons = styled(Link)`
  position: absolute;
  width: 7%;
  height: 7%;
  background-color: #ffffff;
  border-radius: 20px;
  text-align: center;
`;

const Home = () => {
  const { connect, provider, hasCachedProvider, chainID, connected } =
    useWeb3Context();
  const [walletChecked, setWalletChecked] = useState(false);
  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);
  return (
    <div>
      <HomeTree />
      <div style={{ position: "absolute", top: "10%", left: "10%" }}>
        <ConnetButton />
      </div>

      <TreeButtons to="/Inventory" style={{ top: "30%", left: "30%" }}>
        <p>Inventory</p>
      </TreeButtons>
      <TreeButtons to="/Mint" style={{ top: "60%", left: "60%" }}>
        <p>Mint</p>
      </TreeButtons>
      <TreeButtons to="/Merge" style={{ top: "45%", left: "45%" }}>
        <p>Merge</p>
      </TreeButtons>
      <TreeButtons to="/About" style={{ top: "30%", left: "60%" }}>
        <p>About</p>
      </TreeButtons>
      <TreeButtons to="/Stake" style={{ top: "60%", left: "30%" }}>
        <p>Stake</p>
      </TreeButtons>
    </div>
  );
};

const Treebtn = styled(Link)`
  background-color: #000000;
`;

export default Home;
