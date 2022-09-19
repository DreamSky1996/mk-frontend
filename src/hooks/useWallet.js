// import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
// import { ethers } from 'ethers';
// import ethersHelpers from '../utils/ethersHelpers';
// import config from '../config.js';
// import chains from '../data/chains.json';
// import detectEthereumProvider from '@metamask/detect-provider';

// const EthersContext = createContext(null);

// export const supportedChains = config.supportedChains;
// export const getChainToken = (chainId) => chains[chainId].symbol;

// export const useWallet = () => {
//   const ethersContext = useContext(EthersContext);
//   if (!ethersContext) {
//     throw new Error('useWallet() can only be used inside of <EthersContextProvider />, please declare it at a higher level.');
//   }
//   const { onChainProvider } = ethersContext;
//   return useMemo(() => ({ ...onChainProvider }), [onChainProvider]);
// };

// export const EthersContextProvider = ({ children }) => {
//   const [connected, setConnected] = useState(false);
//   const [address, setAddress] = useState('');
//   const [provider, setProvider] = useState(null);
//   const [chainId, setChainId] = useState(0);
//   const [balance, setBalance] = useState(-1);
//   const [chainSupported, setChainSupported] = useState(false);
//   const [walletMissing, setWalletMissing] = useState(false);
//   const [signer, setSigner] = useState(null);
//   const [ready, setReady] = useState(false);

//   const switchNetwork = useCallback(async (newChainId) => {
//     if (!newChainId) newChainId = config.supportedChains[0];

//     const hexChainId = ethers.utils.hexlify(newChainId);
//     const chainData = chains[newChainId];
//     try {
//       await window.ethereum.request({
//         method: 'wallet_switchEthereumChain',
//         params: [{ chainId: hexChainId }]
//       });
//     } catch (switchError) {
//       // This error code indicates that the chain has not been added to MetaMask.
//       if (switchError.code === 4902) {
//         try {
//           await window.ethereum.request({
//             method: 'wallet_addEthereumChain',
//             params: [
//               {
//                 chainId: hexChainId,
//                 chainName: chainData.name,
//                 rpcUrls: [chainData.defaultRpcUrl],
//                 nativeCurrency: chainData.nativeCurrency,
//                 blockExplorerUrls: [chainData.explorer]
//               }
//             ]
//           });
//         } catch (addError) {
//           console.error('Error while adding new chain', addError);
//         }
//       }
//     }
//   }, []);

//   const connect = useCallback(async () => {
//     if (!provider) console.error('metamask must be installed');
//     try {
//       // Make sure wallet is connected
//       await provider.send('eth_requestAccounts', []);

//       const signer = provider.getSigner();
//       const address = await signer.getAddress();
//       setAddress(address);
//       setConnected(true);

//       // getBalance can get stuck forever in some unknown circumstances
//       const balance = ethersHelpers.formatUnitParseFloat(await signer.getBalance());
//       setBalance(balance);
//       setSigner(signer);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setReady(true);
//     }
//   }, [provider]);

//   const init = useCallback(async () => {
//     const network = await provider.getNetwork();
//     setChainId(network.chainId);

//     setChainSupported(supportedChains.includes(network.chainId));

//     const addresses = await provider.send('eth_accounts');
//     if (addresses && addresses.length && !connected) connect();
//     else setReady(true);
//   }, [provider, connect, connected]);

//   const setup = async () => {
//     const eth = await detectEthereumProvider({ mustBeMetaMask: true, timeout: 10000 });

//     if (!eth) {
//       setWalletMissing(true);
//       setReady(true);
//       return null;
//     }

//     const newProvider = new ethers.providers.Web3Provider(eth);

//     eth.on('accountsChanged', () => {
//       window.location.reload();
//     });

//     eth.on('chainChanged', () => {
//       window.location.reload();
//     });

//     setProvider(newProvider);
//   };

//   useEffect(() => {
//     setup();
//   }, []);

//   useEffect(() => {
//     if (provider) init();
//   }, [provider, init]);

//   const onChainProvider = useMemo(
//     () => ({
//       connect,
//       provider,
//       // for compatibility with previous version
//       library: provider,
//       connected,
//       address,
//       // for compatibility with previous version
//       account: address,
//       chainId,
//       balance,
//       chainSupported,
//       switchNetwork,
//       walletMissing,
//       signer,
//       active: provider && chainSupported && connected && signer,
//       ready
//     }),
//     [connect, provider, connected, address, chainId, balance, chainSupported, switchNetwork, walletMissing, signer, ready]
//   );

//   return <EthersContext.Provider value={{ onChainProvider }}>{children}</EthersContext.Provider>;
// };
