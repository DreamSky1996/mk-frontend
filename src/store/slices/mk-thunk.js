import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { MergeContractabi } from "../../contracts";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const mkMint = createAsyncThunk("MK/mint", async ({amount, mintPrice, provider, networkID}, {dispatch}) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const mkContract = new ethers.Contract(addresses.MK_ADDRESS, MergeContractabi.abi, signer);
    let total_price = amount  * mintPrice;
    const options = {value: ethers.utils.parseEther(total_price.toFixed(18))}
    console.log(options);
    let mintTx;
    try{
        mintTx = await mkContract.mint(amount.toString(), options);
        await mintTx.wait();
        console.log("Minted");
    } catch (err) {
        console.log(err);
    } finally {
        console.log("final");
    }

});

export const mkMultipleMerges = createAsyncThunk("MK/multipleMerges", async ({firstIdList, secondIdList, basePrice, provider, networkID}, {dispatch}) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const mkContract = new ethers.Contract(addresses.MK_ADDRESS, MergeContractabi.abi, signer);
    let total_price = firstIdList.length * basePrice + 0.00001;
    console.log(ethers.utils.parseEther(total_price.toFixed(18)));
    const options = {value: ethers.utils.parseEther(total_price.toFixed(18))}
    let mergeTx;
    try{
        mergeTx = await mkContract.prepareMultipleMerges(firstIdList, secondIdList, options);
        await mergeTx.wait();
        console.log("Merged");
    } catch (err) {
        console.log(err);
    } finally {
        console.log("final");
    }

});

export const mkStake = createAsyncThunk("MK/stake", async ({idList, provider, networkID}, {dispatch}) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const mkContract = new ethers.Contract(addresses.MK_ADDRESS, MergeContractabi.abi, signer);
    let stakeTx;
    try{
        stakeTx = await mkContract.stakeToken(idList);
        await stakeTx.wait();
        console.log("staked");
    } catch (err) {
        console.log(err);
    } finally {
        console.log("final");
    }
});

export const mkUnstake = createAsyncThunk("MK/unstake", async ({idList, provider, networkID}, {dispatch}) => {
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const mkContract = new ethers.Contract(addresses.MK_ADDRESS, MergeContractabi.abi, signer);
    let unStakeTx;
    try{
        unStakeTx = await mkContract.unstake(idList);
        await unStakeTx.wait();
        console.log("unstaked");
    } catch (err) {
        console.log(err);
    } finally {
        console.log("final");
    }
});