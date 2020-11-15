const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("Vote");

module.exports = function(deployer) {
  deployer.deploy(Context);
  deployer.deploy(IERC20);
  deployer.deploy(SafeMath);
  deployer.deploy(ERC20);
  deployer.link(Context, ERC20);
  deployer.link(IERC20, ERC20);
  deployer.link(SafeMath, ERC20);
  deployer.link(ERC20, Vote);
  deployer.deploy(Vote);
};
