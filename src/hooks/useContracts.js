// import { useWallet } from './useWallet';
// import { useState, useEffect, useMemo } from 'react';
// import { ethers } from 'ethers';
// import { getAddresses } from '../utils/constants';
// import silverABI from '../contracts/SILVERABI.json';

// const addresses = getAddresses();

// const silver = new ethers.Contract(addresses.SILVER, silverABI.abi);

// export const useContracts = () => {
//   const { active, signer } = useWallet();

//   const [silverContract, setSilverContract] = useState(null);

//   useEffect(() => {
//     if (!active || !signer) return;

//     setSilverContract(silver.connect(signer));
//   }, [active, signer]);

//   return useMemo(
//     () => ({ silverContract}),
//     [silverContract]
//   );
// };
