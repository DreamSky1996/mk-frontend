import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "../../hooks";
import { DEFAULD_NETWORK } from "../../constants";

function ConnetButton() {
  const {
    connect,
    disconnect,
    connected,
    web3,
    providerChainID,
    checkWrongNetwork,
  } = useWeb3Context();
  const dispatch = useDispatch();
  const [isConnected, setConnected] = useState(connected);
  let buttonText = "Connect Wallet";
  let clickFunc = connect;
  if (isConnected) {
    buttonText = "Disconnect";
    clickFunc = disconnect;
  }

  if (isConnected && providerChainID !== DEFAULD_NETWORK) {
    buttonText = "Wrong network";
    clickFunc = () => {
      checkWrongNetwork();
    };
  }

  useEffect(() => {
    setConnected(connected);
  }, [web3, connected]);

  return (
    <button className="connect-button" onClick={clickFunc}>
      <p>{buttonText}</p>
    </button>
  );
}

export default ConnetButton;
