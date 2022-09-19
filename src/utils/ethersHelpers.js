const { ethers } = require('ethers');

const formatUnitParseFloat = (value, unit = 18) => Number.parseFloat(ethers.utils.formatUnits(`${value}`, unit));

const formatUnitToLocalString = (value) =>
  formatUnitParseFloat(value).toLocaleString('en', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export const fromWei = (value) => ethers.utils.formatUnits(value, 18);

export const toWei = (value) => ethers.utils.parseUnits(value, 18);

