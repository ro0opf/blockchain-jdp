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
//var connectUrl = "http://localhost:8545"

const CONTRACT_ADDRESS="0x394BfB86641Bf8cA8A757a318499A580Cc1f26C6";
const BESU_CONNECTION_URL= "https://besutest.chainz.network";
const JDP_ADDRESS="0x45a4176b1EF305666461061c28f04fe7157CE7Fe";
const JDP_PRIVATE_KEY="89f71e1cdab6bbca7f8d3e7181bfaebd16e5df6a2047403bf2847e8064525318";
const gasLimit=1237312
const gasPrice=0

//const gasLimit = 6721975;
//const gasPrice = 20000000000;

const BESU_CONNECTION_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9vbDoqIiwiZWVhOioiXSwiZXhwIjoxNjA3MTQ4Mjk1LCJ0ZWFtIjoiMTMifQ.xpnw-lQOWzeWWQqKKy-kX-oN3Nsy85gsCmh1UVIjz2FN76m44FEW98WdnOgD-1yb-FyjwsIijvRRj7ugxn6hbN99NWE06aXsht_95-LwvkAwGC0nb4Xc6y6tA7nSB-jtUaQ10Qsvdgh7ymqe2T6SsdaRYiV3Mk077PN80daJIfGqtoD2kiOJZPQ6XNHNECJxgICBxXQNn8x3Yznt4hF0Ms9TrYYWpTHxTlwf8UjDzMnZvyLduN5L_Mnn37r0jIJebVPOHTucIxLpwGD_mN628sbQvPt9_R0Lyzf35JCf1nDB7T1PHSF4lAvSAtJLwvJMUIoz8RKfiHFve_w0ueoG4w";
function setJwtToken() {
    let httpOptions;
    if (BESU_CONNECTION_TOKEN != '') {
        httpOptions = {
            headers: [
                {
                    name: 'Authorization',
                    value: 'Bearer ' + BESU_CONNECTION_TOKEN,
                },
            ],
        };
    }
    return httpOptions;
}

let web3 = new Web3(new Web3.providers.HttpProvider(BESU_CONNECTION_URL, setJwtToken()));
//web3 = new Web3(new Web3.providers.HttpProvider(connectUrl));

// Contract Interface, Need to modify ABI
var jsonInterface =
	[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
			"type": "function",
			"constant": true
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
				}
			],
			"name": "withdraw",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]



// Call contract

/*
var v_cntrct = new web3.eth.Contract(jsonInterface
	, '0x71F29aD3a2FebD80dd41d119113aB23796429706' // Contract Address(=event ID)
);
*/
var v_cntrct = new web3.eth.Contract(jsonInterface
	, CONTRACT_ADDRESS );

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

			    connection.query('SELECT * FROM vote_spc WHERE voter_id=\'' + u_id + '\'', function (s_err, s_rows, s_fields) {
							
				    if(!s_err){
					var r_length = s_rows.length;
					console.log(r_length);
					for (var i=0; i<r_length; i++){
					
						var vote_info = new Object();
						vote_info.company = s_rows[i]['voted_company'];
						vote_info.voted_amt = s_rows[i]['voted_amt'];
						vote_info.event_id = s_rows[i]['event_id'];
						vote_info.voted_dtm = s_rows[i]['audit_dtm'];
							
						voted_company.push(vote_info);
				    	}	

					res_json.voted_list = voted_company;

			    		console.log(res_json);
			    		res.send(res_json);
				    }	
				    			
    			    });
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
			vote_info.company = rows[i]['voted_company'];
			vote_info.voted_amt = rows[i]['voted_amt'];
			vote_info.event_id = rows[i]['event_id'];
			vote_info.voted_dtm = rows[i]['audit_dtm'];
			vote_info.voted_rslt = rows[i]['voted_rslt'];
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
	var acnt_id = u_id;
	var res_json = new Object();
	
	connection.query('SELECT * FROM user_acnt WHERE voter_id=\'' + u_id+ '\'', function (err, rows, fields) {
		if (!err) {
	            if(rows[0] != undefined) {

			    acnt_id = rows[0]['eth_id'];
			    console.log(acnt_id);

			    v_cntrct.methods.balanceOf(acnt_id).call()
				.then(result => {
					console.log(result)
					res_json.balance = result/10000000000;
					res.send(res_json);
				})
				.catch(err => {
					res_json.balance = -1;
			    		res.send(res_json);
				});

		    }
		    else {
			    res_json.balance = -1;
			    res.send(res_json);
		    }
		} else {
		    	res_json.balance = -1;
			res.send(res_json);
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
	var vote_c_id = "test_eth_id";
	var voted_rslt;
        // 0) Query if event is valid
	var event_valid_flag = false;
	var privateKey;
	var res_json = new Object();
        connection.query('SELECT * FROM vote_list WHERE event_id=\'' + event_id+ '\'', function (err, rows, fields) {
		if(!err){
			if(rows[0] != undefined){
				event_valid_flag = true;
			}
			else{
					
				res_json.voted_rslt = "EVENT_ID_ERROR";
				res.send(res_json);
			}
		}
	});

	// 1) GET vote_company id
        connection.query('SELECT ua.eth_id FROM user_acnt ua, event_com ec WHERE ec.voter_name =\'' + vote_c +'\' AND ec.voter_id = ua.voter_id AND ec.event_id =\'' + event_id + '\'', function (err, rows, fields) {
		if(!err){
			if(rows[0] != undefined){
				vote_c_id = rows[0]['eth_id'];

				console.log(vote_c_id);
			}
			else{
					
				res_json.voted_rslt = "EVENT_ID_ERROR";
				voted_rslt = "EVENT_ID_ERROR";
				res.send(res_json);
			}
		}
	});

	connection.query('SELECT * FROM user_acnt WHERE voter_id=\'' + u_id+ '\'', function (err, rows, fields) {
		if (!err) {

		    
		    res_json.company = vote_c;
	            res_json.voted_amt = vote_amt;

		    if(rows[0] != undefined) {
			    
			    acnt_id = rows[0]['eth_id'];
			    // Call Contract to 'VOTE'
			    privateKey = rows[0]['private_key'];
			    console.log(privateKey);
		            // 1) Query Balance
			    var u_balance;

			    v_cntrct.methods.balanceOf(acnt_id).call(
					{from : acnt_id,
						gas: web3.utils.toHex(gasLimit),
				    		gasPrice: web3.utils.toHex(gasPrice)
					}, // Account
					function(error, result) {

						var res_json = new Object();
			    			u_balance = result/10000000000;
						console.log(u_balance);
					}
			    );
			    // 2) Balance validation
			    if(vote_amt > u_balance) {
				res_json.voted_rslt = "LACK OF BALANCE";
			   	res.send(res_json);
			    }


			    // 3) Voting
			    else {
				// set account 
			        var account = web3.eth.accounts.privateKeyToAccount(privateKey);
     			        web3.eth.accounts.wallet.add(account);
			        web3.eth.defaultAccounts = account.address;
			    
				vote_amt = vote_amt * 10000000000;
				v_cntrct.methods.voting(event_id, vote_c_id, vote_amt).send(
					{	from : acnt_id,
						gas: web3.utils.toHex(gasLimit),
				    		gasPrice: web3.utils.toHex(gasPrice),} // Account
				).then(receipt => {
					
					console.log(receipt);
					res_json.voted_rslt = "NORMAL";
					voted_rslt = "NORMAL";
					res.send(res_json);
	
					
				})
				.catch(error => {
					console.error(error);
				});
			    }

		    }
		    else {
			    res_json.voted_rslt = "USER_ID ERROR";
			    voted_rslt = "USER_ID ERROR";
			    res.send(res_json);
		    }
		} else {
			res_json.voted_rslt = "USER_ID ERROR";
			voted_rslt = "USER_ID ERROR";
		        res.send(res_json);
		}
    	});

	var max_ser_num = 0;
	connection.query('SELECT MAX(ser_num) ser_num FROM vote_spc WHERE voter_id=\'' + u_id+ '\'', function (s_err, s_rows, s_fields) {	
		if(!s_err){
			if(s_rows[0] != undefined) {
				max_ser_num = s_rows[0]['ser_num']+1;
				// INSERT REWARD DETAIL
				var sql = 'INSERT INTO vote_spc VALUES(?,?,?,?,?,?,?)';
				var params = [u_id, event_id, max_ser_num, vote_c, vote_amt/10000000000, voted_rslt, new Date()]
				connection.query(sql,params,function(ss_err,ss_rows,ss_fields) {
					if(ss_err){
					    console.log(ss_err);
					}else{
					    console.log(ss_rows.insertId);
					}
				});								

			}
		}
	});		

	// DB INSERT AND UPDATE

});


// Get Reward status

app.get('/reward', (req, res) => {
	var query = url.parse(req.url, true).query;
	var u_id = query.id;
        // DB Query
	console.log(u_id);
	connection.query('SELECT voter_id, event_id, reward_rslt, voted_company, SUM(reward_amt) reward_amt FROM reward_spc WHERE voter_id = \'' + u_id + '\'' + 'GROUP BY event_id, reward_rslt, voted_company\'', function (err, rows, fields) {
		if (!err) {
		    
	            var res_json = new Object();
	            if(rows[0] != undefined) {
			    console.log('aaa');
			    var r_length = rows.length;

			    var vote_info_dtl = new Array();

			    for(var i=0; i<r_length; i++){
				    var vote_info = new Object();

			            vote_info.company =rows[i]['voted_company'];
			            vote_info.reward_amt = rows[i]['reward_amt'];
			            vote_info.voted_rslt = rows[i]['reward_rslt'];
			            vote_info.event_id = rows[i]['event_id'];

				    vote_info_dtl.push(vote_info);
			    }
			   
                            res_json.reward_status = vote_info_dtl;
			    console.log(res_json);
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

// Find Reward
app.get('/reward/find', (req, res) => {
	
	console.log('reward find');

	var query = url.parse(req.url, true).query;

	var u_id = query.id;
	var event_id = query.event_id;
	var privateKey;
	var acnt_id = "test_eth_id";
	
	// 1) Get reward
	var res_json = new Object();

	var flag= false;

	// 1. GET USER ETH_ID
	connection.query('SELECT * FROM user_acnt WHERE voter_id=\'' + u_id+ '\'', function (err, rows, fields) {
		if(!err){
			if(rows[0] != undefined){
				
				acnt_id = rows[0]['eth_id'];
				privateKey = rows[0]['private_key'];				
				console.log(acnt_id);


			        var account = web3.eth.accounts.privateKeyToAccount(privateKey);
     			        web3.eth.accounts.wallet.add(account);
			        web3.eth.defaultAccounts = account.address;

				var bf_balance;

				v_cntrct.methods.balanceOf(acnt_id).call(
						{
							from : acnt_id,
							gas: web3.utils.toHex(gasLimit),
				    			gasPrice: web3.utils.toHex(gasPrice)
						}, // Account
						function(error, result) {

							var res_json = new Object();
			  				bf_balance = result/10000000000;
							console.log(bf_balance);
						}
				);
			    	
				// 2. GET REWARD 
				
				v_cntrct.methods.withdraw(event_id).send({
						from : acnt_id,
						gas: web3.utils.toHex(gasLimit),
				    		gasPrice: web3.utils.toHex(gasPrice),
				}).then(receipt => {
					// 3. Voted record query
					console.log("success");
					console.log(receipt);

					flag = true;	

					var vote_info_dtl = new Array();
					var r_length;
					connection.query('SELECT voted_company, sum(voted_amt) voted_amt, voted_rslt FROM vote_spc WHERE voter_id=\'' + u_id+ '\' AND event_id =\'' + event_id + '\' GROUP BY voted_company', function (d_err, d_rows, d_fields) {
						if(!d_err){
							if(d_rows[0] != undefined){
								r_length = d_rows.length;
								// INSERT REWARD DETAIL
								var sql = 'INSERT INTO reward_spc VALUES(?,?,?,?,?,?,?)';
								var max_ser_num = 0;
								for (var i=0; i<r_length; i++){
									var vote_info = new Object();

									vote_info.company =d_rows[i]['voted_company'];
									vote_info.reward_amt = d_rows[i]['voted_amt'];
									vote_info.voted_rslt = d_rows[i]['voted_rslt'];
									vote_info.event_id = d_rows[i]['event_id'];
									vote_info_dtl.push(vote_info) 

									console.log(sql);

									
									connection.query('SELECT MAX(ser_num) ser_num FROM vote_spc WHERE voter_id=\'' + u_id+ '\'', function (s_err, s_rows, s_fields) {	
										if(!s_err){
											if(s_rows[0] != undefined) {
												max_ser_num = s_rows[0]['ser_num']+1;
												max_ser_num += 1;
												var params = [u_id, event_id, max_ser_num, vote_info.company, vote_info.reward_amt, 'NORMAL', new Date()];
												connection.query(sql,params,function(sss_err,sss_rows,sss_fields) {
													  if(sss_err){
														    console.log(sss_err);
													  }else{
														    console.log(sss_rows.insertId);
													  }
												});

											}
										}
									});	

								}


							}
							res_json.reward_status = vote_info_dtl;
							res.send(res_json);
						}
						else{	
							console.log(err);
							res_json.reward_find_rslt = vote_info_dtl;
							
						}
					});


				})
				.catch(error => {
						console.error(error);
				});


				var after_balance;

				v_cntrct.methods.balanceOf(acnt_id).call(
						{
							from : acnt_id,
							gas: web3.utils.toHex(gasLimit),
				    			gasPrice: web3.utils.toHex(gasPrice)
						}, // Account
						function(error, result) {

							var res_json = new Object();
			  				after_balance = result/10000000000;
							console.log(after_balance);
						}
				);
				res_json.reward_find_rslt = "NORMAL";
				res_json.value = after_balance - bf_balance;
				
			}
			else{
					
				res_json.reward_find_rslt = "INVALID_USER_ID";
				res.send(res_json);
			}
		}
	});

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
