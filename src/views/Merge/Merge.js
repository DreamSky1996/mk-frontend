import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "../../hooks";
import { mkMultipleMerges } from "../../store/slices/mk-thunk";

const Container = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: #ffffff;
  border-color: #000000;
  border-style: solid;
  text-align: center;
`;

const Merge = () => {
  const dispatch = useDispatch();
  const { provider, chainID } = useWeb3Context();
  const basePrice = useSelector((state) => state.app.basePrice);
  const nftCount = useSelector((state) => state.account.nftCount);
  const ids = useSelector((state) => state.account.ids);
  const loading = useSelector((state) => state.account.loading);

  const [firstList, setfirstList] = useState("");
  const [secondList, setSecondList] = useState("");

  const merge = async () => {
    if (!firstList) return;
    if (!secondList) return;
    let firstIDs = firstList.split(",").map((s) => s.trim());
    let secondIDs = secondList.split(",").map((s) => s.trim());
    if (firstIDs.length != secondIDs.length) return;
    await dispatch(
      mkMultipleMerges({
        firstIdList: firstIDs,
        secondIdList: secondIDs,
        basePrice: basePrice,
        provider: provider,
        networkID: chainID,
      })
    );
  };

  return (
    <div>
      <h1>Merge</h1>
      <Container>
        <div>
          <p>Base Price: {basePrice}</p>
          <p>NFT Count: {nftCount}</p>
          <p>Token IDs: {loading ? "Loading ..." : ids.toString()} </p>
        </div>
        <br />
        <div>
          First Token IDs:{" "}
          <input
            value={firstList}
            onChange={(e) => setfirstList(e.target.value)}
          />
        </div>
        <br />
        <div>
          Second Token IDs:{" "}
          <input
            value={secondList}
            onChange={(e) => setSecondList(e.target.value)}
          />
        </div>
        <br />
        <div>
          <button onClick={merge}>Merge</button>
        </div>
      </Container>
    </div>
  );
};

export default Merge;
