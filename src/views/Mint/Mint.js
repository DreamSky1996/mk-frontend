//? Imports ************************************************************************************************************************
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import theme from "../../utils/Theme";
import { useWeb3Context } from "../../hooks";
import { mkMint } from "../../store/slices/mk-thunk";
//! Imports ***********************************************************************************************************************

const Mint = () => {
  const dispatch = useDispatch();
  const { provider, address, connect, chainID } = useWeb3Context();
  const mintPrice = useSelector((state) => state.app.mintPrice);
  const [amount, setAmount] = useState(0);

  const onMint = async () => {
    if (amount === 0) return;
    await dispatch(
      mkMint({
        amount: amount,
        mintPrice: mintPrice,
        provider: provider,
        networkID: chainID,
      })
    );
  };

  return (
    <Background>
      <MintContainer>
        <InfoContainer style={{ top: "20%", left: "14.5%" }}>
          <PriceText style={{ top: "25%", left: "1%" }}>
            Price: {mintPrice} ETH
          </PriceText>
        </InfoContainer>
        <InfoContainer style={{ top: "40%", left: "14.5%" }}>
          <input
            type={"number"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </InfoContainer>
        {!address && (
          <MintButton style={{ top: "50%", left: "17%" }} onClick={connect}>
            Connect Wallet
          </MintButton>
        )}
        {address && (
          <MintButton style={{ top: "50%", left: "17%" }} onClick={onMint}>
            Mint
          </MintButton>
        )}
        <TokenContainer />
      </MintContainer>
    </Background>
  );
};

//? Styled Components ************************************************************************************************************************
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.palette.primary.dark};
`;

const MintContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: ${theme.palette.primary.main};
  border-color: #000000;
  border-style: solid;
`;

const TokenContainer = styled.div`
    position: absolute;
    top: 15%;
    left: 50%;
    width: 45%;
    height: 65%;
    background-color: ${theme.palette.primary.light}};
    border-color: #000000;
    border-style: solid;
`;

const MintButton = styled.button`
  position: absolute;
  width: 15%;
  height: 10%;
  box-shadow: none;
  border: none;
  border-radius: 12px;
  background-color: ${theme.palette.primary.dark};
  &:hover {
    background-color: ${theme.palette.primary.light};
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  width: 20%;
  height: 20%;
  background-color: ${theme.palette.primary.main};
`;

const PriceText = styled.h1`
  position: absolute;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

//! Styled Components ******************************************************************************************************************

export default Mint;
