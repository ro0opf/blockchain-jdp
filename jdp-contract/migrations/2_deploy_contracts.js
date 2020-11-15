const Context = artifacts.require("Context");
const IERC20 = artifacts.require("IERC20");
const SafeMath = artifacts.require("SafeMath");
const ERC20 = artifacts.require("ERC20");
const Vote = artifacts.require("Vote");

module.exports = function(deployer) {
  deployer.deploy(Vote);
};
