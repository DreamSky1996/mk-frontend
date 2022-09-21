import { ethers } from "ethers";
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { setAll } from "../../helpers";
import { getAddresses } from "../../constants";
import { MergeContractabi } from "../../contracts";

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }) => {
    const addresses = getAddresses(networkID);
    const mergeContract = new ethers.Contract(
      addresses.MK_ADDRESS,
      MergeContractabi.abi,
      provider
    );

    const nftCount = await mergeContract.balanceOf(address);
    let ids = [];
    for (let i = 0; i < nftCount.toNumber(); i++) {
      const id = await mergeContract.tokenOfOwnerByIndex(address, i);
      ids.push(id.toNumber());
    }
    console.log(ids);
    return {
      nftCount: nftCount.toNumber(),
      ids: ids,
    };
  }
);

const initialState = {
  loading: true,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAccountDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});
export default accountSlice.reducer;
export const { fetchAccountSuccess } = accountSlice.actions;
const baseInfo = (state) => state.account;
export const getAccountState = createSelector(baseInfo, (account) => account);
