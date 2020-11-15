pragma solidity ^0.6.0;

import "./ERC20.sol";

contract Vote is ERC20 {
    using SafeMath for uint256;

    address public owner;

    enum EventState {
        READY, OPEN, CLOSED, REFUNDABLE
    }

    constructor() ERC20("JDP token", "JDP") public {
        _setupDecimals(10);
        initialize();
    }

    // event struct
    struct Event{
        uint16 eventId;
        address[] candidate;
        address[] voter;
        mapping (address => mapping (address => uint256)) voteToken; // voter => candidate => voteToken
        address rewardOwner;
        uint256 totalReward;
        address[] finalWinner;
        mapping (address => uint256) received_token; // candidate : total received
        mapping (address => uint256) finalVoterToken;
        mapping (address => uint256) finalReward;
        EventState state;
    }

    Event[] public eventList;

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    function initialize() internal {
      owner = msg.sender;
    }

    function setOwner(address _owner) public ownerOnly {
      owner = _owner;
    }

    // create and init Event and push to the eventList
    function createEvent(uint16 eventId, address[] memory candidateAddress) ownerOnly public {
        uint count = eventList.length;

        eventList.push(Event({
            eventId: eventId,
            candidate: candidateAddress,
            voter: new address[](0),
            rewardOwner: msg.sender,
            totalReward: 0,
            finalWinner: new address[](0),
            state: EventState.READY
        }));

        assert(eventList.length == count+1);
    }

    function getCandidate(uint16 eventId, uint candidateIndex) public view returns (address) {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);
        require(eventList[index].candidate.length>candidateIndex);

        return eventList[index].candidate[candidateIndex];
    }

    function getVoter(uint16 eventId, uint voterIndex) public view returns (address) {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);
        require(eventList[index].voter.length>voterIndex);

        return eventList[index].voter[voterIndex];
    }

    function getVoteToken(uint16 eventId, address voter_, address candidate_) public view returns (uint256) {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);

        return eventList[index].voteToken[voter_][candidate_];
    }

    function getToken(uint16 eventId, address address_, uint target) public view returns (uint256) {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);
        require(target<3);

        if(target == 0)
            return eventList[index].received_token[address_];
        else if(target == 1)
            return eventList[index].finalVoterToken[address_];
        else if(target == 2)
            return eventList[index].finalReward[address_];
        else
            return 0;
    }

    function findIndexByEventId(uint16 eventId) internal view returns (bool findIt, uint index) {
        for (uint i = 0; i < eventList.length; i++) {
            if(eventList[i].eventId == eventId) return (true, i);
        }
        return (false, 0);
    }

    function startVoting(uint16 eventId) ownerOnly public {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        assert(index < eventList.length);
        require(eventList[index].state == EventState.READY);

        require(eventList[index].candidate.length < 256);
        for (uint i = 0; i < eventList[index].candidate.length; i++) {
            eventList[index].received_token[eventList[index].candidate[i]] = 0;
        }

        eventList[index].state = EventState.OPEN;
    }

    function stopVoting(uint16 eventId) ownerOnly public {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);
        require(eventList[index].state == EventState.OPEN);

        eventList[index].state = EventState.CLOSED;
    }

    function setRefundable(uint16 eventId) ownerOnly public {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);
        require(eventList[index].state == EventState.CLOSED);

        setWinner(index);
        distributeReward(index);

        eventList[index].state = EventState.REFUNDABLE;
    }

    function setWinner(uint index) internal {
        assert(eventList[index].state == EventState.CLOSED);
        address[] memory candidate_ = eventList[index].candidate;

        require (candidate_.length > 0);

        address winner = candidate_[0];
        uint256 winnerToken = eventList[index].received_token[winner];

        // find address received biggest token
        for (uint i = 1; i < candidate_.length; i++) {
            if(eventList[index].received_token[candidate_[i]] > winnerToken) {
                winner = candidate_[i];
                winnerToken = eventList[index].received_token[candidate_[i]];
            }
        }

        eventList[index].finalWinner.push(winner);

        // check multiple winner
        for (uint i = 0; i < candidate_.length; i++) {
            if(eventList[index].received_token[candidate_[i]] == winnerToken) {
                // if not already pushed winner
                if(candidate_[i] != eventList[index].finalWinner[0])
                    eventList[index].finalWinner.push(candidate_[i]);
            }
        }
    }

    function distributeReward(uint index) internal {
        assert(eventList[index].state == EventState.CLOSED);
        uint256 totalPot = eventList[index].totalReward;
        uint256 candidatePot = totalPot.mul(7).div(10);
        uint256 voterPot = totalPot.mul(3).div(10);

        assert(totalPot >= candidatePot.add(voterPot));

        // candidate
        //address[] memory candidate_ = eventList[index].candidate;
        uint256 totalReceivedToken = 0;

        // get totalReceivedToken
        for (uint i = 0; i <  eventList[index].candidate.length; i++) {
            totalReceivedToken = totalReceivedToken.add(eventList[index].received_token[eventList[index].candidate[i]]);
        }

        for (uint i = 0; i < eventList[index].candidate.length; i++) {
            eventList[index].finalReward[eventList[index].candidate[i]] = candidatePot.mul(eventList[index].received_token[eventList[index].candidate[i]]).div(totalReceivedToken);
            approve(eventList[index].candidate[i], eventList[index].finalReward[eventList[index].candidate[i]]);
        }

        // voter
        //address[] memory voter_ = eventList[index].voter;
        uint256 totalVoterToken = 0;
        uint256 token = 0;
        // get totalVoterToken with winner bonus
        for (uint i = 0; i < eventList[index].voter.length; i++) {
            for (uint j = 0; j < eventList[index].candidate.length; j++) {
                token = 0;
                token = eventList[index].voteToken[eventList[index].voter[i]][eventList[index].candidate[j]];
                if(isWinner(index, eventList[index].candidate[j]))
                    token = token.mul(3).div(2);

                eventList[index].finalVoterToken[eventList[index].voter[i]] = eventList[index].finalVoterToken[eventList[index].voter[i]].add(token);
            }
            totalVoterToken = totalVoterToken.add(eventList[index].finalVoterToken[eventList[index].voter[i]]);
        }

        for (uint i = 0; i < eventList[index].voter.length; i++) {
            eventList[index].finalReward[eventList[index].voter[i]] = voterPot.mul(eventList[index].finalVoterToken[eventList[index].voter[i]]).div(totalVoterToken);
            approve(eventList[index].voter[i], eventList[index].finalReward[eventList[index].voter[i]]);
        }
    }

    function isWinner(uint index, address candidate_) internal view returns (bool)  {
        for (uint i = 0; i < eventList[index].finalWinner.length; i++) {
            if(eventList[index].finalWinner[i] == candidate_) return true;
        }

        return false;
    }


    function isValidCandidate(uint index, address candidate_) internal view returns (bool)  {
        for (uint i = 0; i < eventList[index].candidate.length; i++) {
            if(eventList[index].candidate[i] == candidate_) return true;
        }

        return false;
    }

    function IsExistVoter(uint index, address voter_) internal view returns (bool)  {
        for (uint i = 0; i < eventList[index].voter.length; i++) {
            if(eventList[index].voter[i] == voter_) return true;
        }

        return false;
    }

    function voting(uint16 eventId, address candidate, uint256 token) public {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);
        require(eventList[index].state == EventState.OPEN);

        // check candidate and voter validity
        require(isValidCandidate(index, candidate) == true);

        // sendToken to rewardOwner
        sendTokenToRewardOwner(eventList[index].rewardOwner, token);

        if(IsExistVoter(index, msg.sender) == false)
            eventList[index].voter.push(msg.sender); // add voter

        eventList[index].voteToken[msg.sender][candidate] = eventList[index].voteToken[msg.sender][candidate].add(token);
        eventList[index].received_token[candidate] = eventList[index].received_token[candidate].add(token);
        eventList[index].totalReward = eventList[index].totalReward.add(token);

    }

    function sendTokenToRewardOwner(address recipient, uint256 token) internal {
        transfer(recipient, token);
    }


    function fundReward(uint16 eventId, uint256 token) ownerOnly public returns (uint256) {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);
        require(eventList[index].state == EventState.READY || eventList[index].state == EventState.OPEN);

        uint256 currentTotalReward = eventList[index].totalReward;

        sendTokenToRewardOwner(eventList[index].rewardOwner, token);

        eventList[index].totalReward = eventList[index].totalReward.add(token);
        assert(eventList[index].totalReward == currentTotalReward.add(token));
        return eventList[index].totalReward;
    }

    function withdraw(uint16 eventId) public {
        bool findIt = false;
        uint index = 0;
        (findIt, index) = findIndexByEventId(eventId);

        require(findIt);
        require(index < eventList.length);

        require(eventList[index].state == EventState.REFUNDABLE);

        uint256 token = eventList[index].finalReward[_msgSender()];
        require(token > 0);

        eventList[index].finalReward[_msgSender()] = 0;
        eventList[index].totalReward = eventList[index].totalReward.sub(token);

        // send token from rewardOwner to msg sender
        transferFrom(eventList[index].rewardOwner, _msgSender(), token);

    }
}