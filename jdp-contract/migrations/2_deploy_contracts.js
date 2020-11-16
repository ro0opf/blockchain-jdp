const Context = artifacts.require("Context");
const IERC20 = artifacts.require("IERC20");
const SafeMath = artifacts.require("SafeMath");
const ERC20 = artifacts.require("ERC20");
const Vote = artifacts.require("Vote");

module.exports = function(deployer) {
  deployer.deploy(Vote, '0x45a4176b1EF305666461061c28f04fe7157CE7Fe');
};
