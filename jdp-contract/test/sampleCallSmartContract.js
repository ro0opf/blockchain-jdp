'use strict'
const Web3 = require('web3');

const provider = "http://127.0.0.1:7545";

let web3 = new Web3(new Web3.providers.HttpProvider(provider));

// get from remix 
const JDPContractJson = require('./vote.json');
const JDPABI = JDPContractJson.abi;
// get from remix after deploy
const ContractAddress = '0x42E2d19380cDB0daf2e4Db0d60A5EA41Ee971C68';

const JDPContract = new web3.eth.Contract(JDPABI, ContractAddress);

// get from ganache
const address = '0xb06D97eB470f7a42967423bDbe34ACf03fDb3D06';
const privateKey = '0x978102fedca401ae658f21f104af232ba81542559985d0a9c6910070994cae33';

// set account 
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccounts = account.address;

const gasLimit = 6721975;
const getPrice = 20000000000;

function callTransfer(recipient, amount) {
    return JDPContract.methods
        .transfer(recipient , amount)
        .send({
            from: address,
            gas: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
        })
        .then(receipt => {
            //console.log('receipt ', receipt);
            //return receipt;
        })
        .catch(error => {
            console.error(error);
        })
}

function getBalance(addr){
    return JDPContract.methods.balanceOf(addr).call();
}

const addr = "0x7b1127bA63488934b38c9382d993017786fd53f2"
const token = 100;
callTransfer(addr, token);
getBalance(addr).then(result => console.log(result));
