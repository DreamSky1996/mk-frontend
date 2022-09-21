import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "../../hooks";
import { mkStake, mkUnstake } from "../../store/slices/mk-thunk";

const Container = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: #ffffff;
  border-color: #000000;
  border-style: solid;
`;

const ReturnRate = styled.div`
  position: absolute;
  top: 10%;
  left: 60%;
  width: 30%;
  height: 20%;
  background-color: #ffffff;
  border-color: #000000;
  border-style: solid;
`;

const StakeContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 60%;
  width: 30%;
  height: 30%;
  background-color: #ffffff;
  border-color: #000000;
  border-style: solid;
`;

const SelectContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 60%;
  width: 30%;
  height: 30%;
  background-color: #ffffff;
  border-color: #000000;
  border-style: solid;
`;

const Stake = () => {
  const dispatch = useDispatch();
  const { provider, address, connect, chainID, checkWrongNetwork } =
    useWeb3Context();
  const nftCount = useSelector((state) => state.account.nftCount);
  const ids = useSelector((state) => state.account.ids);
  const loading = useSelector((state) => state.account.loading);

  const [stakeList, setStakeList] = useState("");
  const [unStakeList, setUnStakeList] = useState("");

  const stake = async () => {
    if (!stakeList) return;
    let stakeIDs = stakeList.split(",").map((s) => s.trim());
    console.log(stakeIDs);
    await dispatch(
      mkStake({ idList: stakeIDs, provider: provider, networkID: chainID })
    );
  };

  const unstake = async () => {
    if (!unStakeList) return;
    let unstakeIDs = unStakeList.split(",").map((s) => s.trim());
    console.log(unstakeIDs);
    await dispatch(
      mkUnstake({ idList: unstakeIDs, provider: provider, networkID: chainID })
    );
  };

  return (
    <div>
      <h1>Stake</h1>
      <Container>
        <div style={{ textAlign: "center" }}>
          <div>
            <p>NFT Count: {nftCount}</p>
            <p>Token IDs: {loading ? "Loading ..." : ids.toString()} </p>
          </div>
          <div>
            <input
              value={stakeList}
              onChange={(e) => setStakeList(e.target.value)}
            />
            <button onClick={stake}>Stake</button>
          </div>
          <br />
          <div>
            <input
              value={unStakeList}
              onChange={(e) => setUnStakeList(e.target.value)}
            />
            <button onClick={unstake}>Unstake</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Stake;
