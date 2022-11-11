const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");

export let web3;

export default function Web3Instance(http_provider) {
    web3 = new Web3Quorum(new Web3(http_provider));
    return web3;
  }