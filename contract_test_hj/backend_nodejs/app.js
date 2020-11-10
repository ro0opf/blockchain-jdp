// HTTP Server Config
var express = require("express");  
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = 8080
server.listen(port);

// Web3 Config
var Web3 = require("web3");
var connectUrl = "http://localhost:8545"
web3 = new Web3(new Web3.providers.HttpProvider(connectUrl));

// Contract Interface, Need to modify ABI
var jsonInterface = 
    [{
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "candidateNames",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidateList",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "votesReceived",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "voteForCandidate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "totalVotesFor",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "validCandidate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "queryCandidateList",
      "outputs": [
        {
          "internalType": "bytes32[]",
          "name": "",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }    
    ]

// Call contract

var v_cntrct = new web3.eth.Contract(jsonInterface
	, '0x21766a9babFC62e254AfCa190A45773C90B4C441' // Contract Address(=event ID)
);


// Return 
app.get('/', (req, res) => {
	console.log(v_cntrct.methods);

	var acnt = "0xC248cC9f59AB7eb4FC2C43C2186437711c295a57";
	
	/*
	v_cntrct.methods.candidateList.call().then( data => {
		console.log('variable: ${data}');
		res.send(data);
	});
	*/

	// available vote company list

	var c_list = [];

	v_cntrct.methods.queryCandidateList().call(
		{from : acnt},

		function(error, result){
			
			for(var i=0; i<result.length; i++){
				c_list.push(
					{
						cname	: Web3.utils.hexToString(result[i])
					}
				);
			}

			res.send(c_list);
		}
	);
	/*
	v_cntrct.methods.totalVotesFor('Nick').call(
		{from : acnt}, // Account
		function(error, result) {
			console.log(result);
			res.send(result);			
		}
        );
	//console.log(v);
	*/
});

