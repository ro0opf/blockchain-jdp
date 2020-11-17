pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vote.sol";

contract TestVote {

  function testInitialBalanceUsingDeployedContract() public {
    Vote v = Vote(DeployedAddresses.Vote());

    uint expected = 10000000000000000;

    Assert.equal(v.getBalance(tx.origin), expected, "Owner should have 10000000000000000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    Vote meta = new Vote();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

}
