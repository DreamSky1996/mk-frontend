import { ethers } from "ethers";
import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { setAll } from "../../helpers";
import { getAddresses } from "../../constants";
import { MergeContractabi } from "../../contracts";
import { fromWei } from "../../utils/ethersHelpers";

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  //@ts-ignore
  async ({ networkID, provider }) => {
    const addresses = getAddresses(networkID);
    const mergeContract = new ethers.Contract(
      addresses.MK_ADDRESS,
      MergeContractabi.abi,
      provider
    );
    const mintCost = await mergeContract.mintCost();
    const basefee = await mergeContract.baseFees();
    const mintCostETH = fromWei(mintCost);
    const basefeeEth = fromWei(basefee);
    console.log(mintCostETH);
    return {
      mintPrice: mintCostETH,
      basePrice: basefeeEth,
    };
  }
);

const initialState = {
  loading: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

const baseInfo = (state) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, (app) => app);
