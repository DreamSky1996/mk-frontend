import config from "../config";

const addresses = {
  SILVER: "0x5b98DA0a2c2D341B6FA859a8ED28b5D91B5524ee",
};

export const getAddresses = () => addresses[config.supportedChains[0]];
