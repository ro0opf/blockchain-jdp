// HTTP Server Config
var express = require("express");  
var url = require("url");
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = 9999
server.listen(port);

var bodyParser = require('body-parser');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// MARIA DB CON

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'database-jp.cqsqhu1qb52v.ap-northeast-2.rds.amazonaws.com',
    post: 3306,
    user: 'admin',
    password: 'jdp#1234',
    database: 'jdp'
});

connection.connect();


// Web3 Config
var Web3 = require("web3");
var connectUrl = "http://localhost:8545"
web3 = new Web3(new Web3.providers.HttpProvider(connectUrl));

// Contract Interface, Need to modify ABI
var jsonInterface = 
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "address[]",
				"name": "candidateAddress",
				"type": "address[]"
			}
		],
		"name": "createEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "eventList",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "address",
				"name": "rewardOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalReward",
				"type": "uint256"
			},
			{
				"internalType": "enum Vote.EventState",
				"name": "state",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "token",
				"type": "uint256"
			}
		],
		"name": "fundReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "candidateIndex",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "address",
				"name": "address_",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "target",
				"type": "uint256"
			}
		],
		"name": "getToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "address",
				"name": "voter_",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "candidate_",
				"type": "address"
			}
		],
		"name": "getVoteToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "voterIndex",
				"type": "uint256"
			}
		],
		"name": "getVoter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			}
		],
		"name": "setRefundable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			}
		],
		"name": "startVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			}
		],
		"name": "stopVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			},
			{
				"internalType": "address",
				"name": "candidate",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "token",
				"type": "uint256"
			}
		],
		"name": "voting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "eventId",
				"type": "uint16"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]



// Call contract

var v_cntrct = new web3.eth.Contract(jsonInterface
	, '0xD9e20E4D2a47DAE025bf64E42B2eC4d769AF7639' // Contract Address(=event ID)
);


// Return 
app.get('/', (req, res) => {
	console.log(v_cntrct.methods);

	var acnt = "0x805feB1cE4BCf1EA7D1C5EB0c7f3D675Fb503898";
	
	/*
	v_cntrct.methods.candidateList.call().then( data => {
		console.log('variable: ${data}');
		res.send(data);
	});
	*/

	// available vote company list

	res.send("hi");

	/*
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
	*/
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



app.post('/login', (req, res) => {
	
	var u_id = req.body.user_id;
	var u_pwd = req.body.user_pwd;

	var login_rslt = "True";
	var eth_id = "test_eth_id";
	
	var res_json = new Object();
	
	// DB QUERY
	console.log(u_id);
	console.log(u_pwd);

	connection.query('SELECT * FROM user_acnt WHERE voter_id=\'' + u_id + '\' AND voter_pwd=\'' + u_pwd + '\'', function (err, rows, fields) {
		if (!err) {
	            if(rows[0] != undefined) {
			    res_json.login_rslt = login_rslt;
			    res_json.eth_id =rows[0]['eth_id'];
			    res_json.user_name = rows[0]['voter_name'];
			    res_json.user_img = rows[0]['voter_img_url'];

			    var voted_company = new Array();

				// return voted_rslt as 'NORMAL'
			    for (var i=0; i<2; i++){
				
				var vote_info = new Object();
				vote_info.voted_company = "SK";
				vote_info.voted_amt = 1000;
				vote_info.voted_dtm = "2020-11-09";
				vote_info.event_id = "test_event_id";
					
				voted_company.push(vote_info);
			    }

			    res_json.voted_list = voted_company;

			    console.log(res_json);
			    res.send(res_json);
		    }
		    else{
			   console.log('LOGIN ERROR : ' + err);
		           login_rslt = "False";
		           res_json.login_rslt = login_rslt;
		           console.log(res_json);
		           res.send(res_json);
		    }
		} else {
		    console.log('LOGIN ERROR : ' + err);
		    login_rslt = "False";
		    res_json.login_rslt = login_rslt;
		    console.log(res_json);
		    res.send(res_json);
		}
    	});


});

// Check voting status
app.get('/voted_status', (req, res) => {
	console.log(req.url);
	var query = url.parse(req.url, true).query;
	console.log(query.id);
	var u_id = query.id;

	// DB Query

	connection.query('SELECT * FROM vote_spc WHERE voter_id=\'' + u_id + '\'', function (err, rows, fields) {
		if (!err) {
                    console.log(rows.length);

		    var r_length = rows.length;

		    var res_json = new Object();
		    var voted_company = new Array();

		    for(var i=0; i<r_length; i++){
			var vote_info = new Object();
			vote_info.company = "SK";
			vote_info.voted_amt = 1000;
			vote_info.event_id = "test_event_id";
			vote_info.voted_dtm = "2020-11-09";
			vote_info.voted_rslt = "INVALID_ERROR";
			voted_company.push(vote_info);
             	    }

		    res_json.voted_status = voted_company;

	   	    console.log(res_json);
			
		    res.send(res_json);

		} else {
		    console.log('voted_status ERROR : ' + err);
		    res.send('voted_status ERROR');
		}
    	});

});

// Balance Query
app.get('/balance', (req, res) => {
	var query = url.parse(req.url, true).query;
	var u_id = query.id;

	console.log('balance');
	console.log(query);

	// DB QUERY: GET ACCOUNT ID
	var acnt_id = "test_eth_id123";

	connection.query('SELECT * FROM user_acnt WHERE voter_id=\'' + u_id+ '\'', function (err, rows, fields) {
		if (!err) {
	            if(rows[0] != undefined) {

			    acnt_id = rows[0]['eth_id'];
			    console.log(acnt_id);
			    // Call Contract
			    //var balance = 1000;

			    // var res_json = new Object();
			    // res_json.balance = balance;

          	            // res.send(res_json);
   		
			    v_cntrct.methods.balanceOf(acnt_id).call().then(result => console.log(result)).catch(err => {console.log(err)});

		    }
		    else {
			    res.send('USER_ID ERROR');
		    }
		} else {
		    console.log('USER_ID ERROR : ' + err);
		    res.send('USER_ID ERROR');
		}
    	});


});

// Vote

app.get('/vote', (req, res) => {
	var query = url.parse(req.url, true).query;
	var u_id = query.id;
	var vote_c = query.company;
	var event_id = query.event_id;
	var vote_amt = query.vote_amt;

	// DB QUERY: GET ACCOUNT ID
	var acnt_id = "test_eth_id";

	connection.query('SELECT * FROM user_acnt WHERE voter_id=\'' + u_id+ '\'', function (err, rows, fields) {
		if (!err) {
	            if(rows[0] != undefined) {

			    acnt_id = rows[0]['eth_id'];

			    // Call Contract to 'VOTE'
			
		            // 1) Query Balance
			    var u_balance;

			    v_cntrct.methods.balanceOf(acnt_id).call(
					{from : acnt_id}, // Account
					function(error, result) {

						var res_json = new Object();
			    			u_balance = result;

					}
			    );

			    // 2) Vote
			
			    v_cntrct.methods.voting(event_id, acnt_id, vote_amt).call(
					{from : acnt_id}, // Account
					function(error, result) {

						var res_json = new Object();
			    			u_balance = result;

					}
			    );


			    // DB INSERT: Voting result


		    }
		    else {
			    res.send('USER_ID ERROR');
		    }
		} else {
		    console.log('USER_ID ERROR : ' + err);
		    res.send('USER_ID ERROR');
		}
    	});

	

	
});


// Get Reward status

app.get('/reward', (req, res) => {
	var query = url.parse(req.url, true).query;
	
        // DB Query

        var r_length = 2;

        var res_json = new Object();
        var reward_company = new Array();

        for(var i=0; i<r_length; i++){
                var vote_info = new Object();
                vote_info.company = "SK";
                vote_info.reward_amt = 1000;
                vote_info.event_id = "test_event_id";
                vote_info.voted_dtm = "2020-11-09";
                vote_info.voted_rslt = "VICTORY";

                reward_company.push(vote_info);
        }

        res_json.reward_status = reward_company;

        console.log(res_json);

        res.send(res_json);
	
});

// Find Reward
app.get('/reward/find', (req, res) => {
	var query = url.parse(req.url, true).query;

	var user_id = query.id;
	var event_id = query.event_id;

	// Call DB Record if i vote or not 
	

	var acnt_id = "test_eth_id";
	// If true : Call Contract

	// 1) Get reward
	
	// DB INSERT: Rewardresult

	var res_json = new Object();
	res_json.compnay = "SK";
	res_json.reward_amt = 1000;
	res_json.event_id = "test_event_id";
	res_json.voted_rslt = "VICTORY";

	console.log(res_json);

	res.send(res_json);
});

// Check voting status; return voting list
app.get('/voting', (req, res) => {
	var query = url.parse(req.url, true).query;

	var st_dt	= query.st_dt;
	var end_dt	= query.end_dt;
	
	var vote_list = [];
	// Contract call
	console.log('/voting');
	console.log(query);

	connection.query('SELECT * FROM vote_list WHERE st_dt >=\'' + st_dt + '\' AND end_dt <=\'' + end_dt + '\'', function (err, rows, fields) {
		if (!err) {
	            if(rows[0] != undefined) {

			    var r_length = rows.length;
			    var res_json = new Object();
			    var vote_info_dtl = new Array();

			    for(var i=0; i<r_length; i++){
				    var vote_info = new Object();

			            vote_info.event_id =rows[i]['event_id'];
			            vote_info.event_nm = rows[i]['event_nm'];
			            vote_info.st_dt = rows[i]['st_dt'];
			            vote_info.end_dt = rows[i]['end_dt'];
				    vote_info.vote_status = rows[i]['vote_status'];

				    vote_info_dtl.push(vote_info);
			    }
			   
                            res_json.voting_detail = vote_info_dtl;
			    res.send(res_json);

		    }
		    else {
			    var vote_info_dtl = new Array();
			    var res_json = new Object();
			    res_json.voting_detail = vote_info_dtl;
			    
			    console.log('NO EVENT ERROR : ');
			    res.send(res_json);
		    }
		} else {
		    console.log('EVENT_ID ERROR : ' + err);
		    res.send('EVENT_ID ERROR');
		}
    	});


});


// Check voting status in detail
app.get('/voting/detail', (req, res) => {
	
	var query = url.parse(req.url, true).query;
	console.log('detail');
	console.log(query);
	var event_id = query.event_id;

	connection.query('SELECT e.subject, ua.voter_img_url, ua.voter_name, e.voted_amt FROM event_com e, user_acnt ua WHERE e.event_id=\'' + event_id + '\' AND e.voter_id = ua.voter_id', function (err, rows, fields) {
		if (!err) {
	            if(rows[0] != undefined) {

			    var r_length = rows.length;
			    var res_json = new Object();
			    var vote_info_dtl = new Array();

			    for(var i=0; i<r_length; i++){
				    var vote_info = new Object();

			            vote_info.subject =rows[i]['subject'];
			            vote_info.company = rows[i]['voter_name'];
			            vote_info.user_img = rows[i]['voter_img_url'];
			            vote_info.voted_amt = rows[i]['voted_amt'];

				    vote_info_dtl.push(vote_info);
			    }
			   
                            res_json.voting_detail = vote_info_dtl;
			    res.send(res_json);

		    }
		    else {
			    res.send('EVENT_ID ERROR');
		    }
		} else {
		    console.log('EVENT_ID ERROR : ' + err);
		    res.send('EVENT_ID ERROR');
		}
    	});


});
