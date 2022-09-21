// import { ethers } from 'ethers';
// import { useEffect, useMemo, useState } from 'react';
// import { useContracts} from './useContracts';
// import { useWallet } from './useWallet';

// const useBalances = () => {
//   const { address, provider } = useWallet();
//   const { mergeContract } = useContracts();

//   const [mergeBalance, setMergeBalance] = useState(ethers.BigNumber.from(0));
//   const [ethBalance, setEthBalance] = useState(ethers.BigNumber.from(0));

//   useEffect(() => {
//     if (address && mergeContract && provider) {
//       (async () => {
//         setEthBalance(await provider.getBalance(address));
//         setMergeBalance(await mergeContract.balanceOf(address));
//       })();
//     }
//   }, [mergeContract, address, provider]);

//   return useMemo(() => ({ ethBalance, mergeBalance }), [ethBalance, mergeBalance]);
// };

// export default useBalances;
