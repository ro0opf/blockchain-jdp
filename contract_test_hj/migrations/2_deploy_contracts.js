/*
 *	author	: hyunjin park
 *	date	: 2020-11-10
 */

var Voting = artifacts.require("./Voting.sol");
let Web3 = require('web3');

// Need to fix Web.utils.utf8ToHex as function

module.exports = function(deployer) {
  deployer.deploy(Voting, [Web3.utils.utf8ToHex("Rama"), Web3.utils.utf8ToHex("Nick"), Web3.utils.utf8ToHex("Jose")]);
};
