"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const Web3Quorum = require("web3js-quorum");
function Web3Instance(http_provider) {
    exports.web3 = new Web3Quorum(new Web3(http_provider));
    return exports.web3;
}
exports.default = Web3Instance;
