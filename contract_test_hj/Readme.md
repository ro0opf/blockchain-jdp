[Dependency Install]
>> sudo npm install web3
>> sudo npm install ganache-cli

[Node JS Install]
>> curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
>> sudo apt-get install -y nodejs

[Truffle Install]
>> sudo npm install -g truffle

- Download sample code
>> truffle unbox webpack

[npm Install]
>> sudo apt-get install npm

[Excute ganachi]
>> ganachi-cli

[Deploy Contract]
>> truffle compile  (Compile contract ) 
>> truffle migrate  (Deploy  contract ) 


[Console Test]

>> truffle console

 1) sample : voting status

>> Voting.deployed().then(function(contractInstance) {contractInstance.totalVotesFor.call('Nick').then(function(v) {console.log(v.toNumber())})})

 2) sample : voting 

>> truffle(default)> Voting.deployed().then(function(contractInstance) {contractInstance.voteForCandidate('Nick').then(function(v) {console.log(v)})})

[Node JS Contract Reference]
1) https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html
2) https://opentutorials.org/course/2869/20680


[TEST AVALABLE ACCOUNT]

voter_id: 
 ['hyunjin', 'hyunjin1', 'hyunjin10', 'hyunjin11', 'hyunjin12', 'hyunjin6', 'hyunjin7', 'hyunjin8', 'hyunjin9', 'jaehyuk', 'jongsuk']
 
company_id:
 ['SK_ENERGY_LOGIN', 'SK_PLANET_LOGIN']

