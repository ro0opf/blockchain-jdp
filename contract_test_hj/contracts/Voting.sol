/*
*	author		: hyunjin park
*	date		: 2020-11-10
*	description	: base function, guideline
*/

pragma solidity ^0.5.16;

contract Voting {

	bytes32[] public candidateList;
	mapping (string => uint8) public votesReceived;

	constructor(bytes32[] memory candidateNames) public {
		candidateList = candidateNames;
	}

	function voteForCandidate(string memory candidate) public {
		require(validCandidate(candidate));
		votesReceived[candidate] +=1;
	}

	function totalVotesFor(string memory candidate) view public returns(uint8){
		require(validCandidate(candidate));
		return votesReceived[candidate];
	}

	function validCandidate(string memory candidate) view public returns(bool){
		for(uint i=0; i< candidateList.length; i++) {
			return true;
		}
		return false;
	}

	// Guideline 

	/*
		function createEvent(uint32 eventId, address[] targetAddress) public returns (address) {}
		
		function startVoting(uint32 eventId, uint duration) public {}
		
		function stopVoting(uint32 eventId, uint duration) public {}
		
		function voting(address target, uint32 token) public {}
		
		function fundReward(uint256 Reward) public (uint256) {}
	
		function withdraw() public returns (uint256) {}

	*/
}

