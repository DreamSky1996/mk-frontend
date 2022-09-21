import { Networks } from "./blockchain";

const GOERLI_TESTNET = {
  SILVER_ADDRESS: "0xf1aAEB228FEDa61f546CB154F09dd758d32e573c",
  MK_ADDRESS: "0x0eBE8706b51AB310044dC5519943BA62D772357a",
};

export const getAddresses = (networkID) => {
  if (networkID === Networks.GOERLI) return GOERLI_TESTNET;

  throw Error("Network don't support");
};
