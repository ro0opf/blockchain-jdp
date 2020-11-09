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
 (Compile contract ) >> truffle compile
 (Deploy  contract ) >> truffle migrate


[Console Test]

>> truffle console

 1) sample : voting status

Voting.deployed().then(function(contractInstance) {contractInstance.totalVotesFor.call('Nick').then(function(v) {console.log(v.toNumber())})})

 2) sample : voting 

truffle(default)> Voting.deployed().then(function(contractInstance) {contractInstance.voteForCandidate('Nick').then(function(v) {console.log(v)})})
