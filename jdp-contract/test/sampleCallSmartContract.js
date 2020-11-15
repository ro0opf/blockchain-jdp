'use strict'
const Web3 = require('web3');

const provider = "http://127.0.0.1:8545";

let web3 = new Web3(new Web3.providers.HttpProvider(provider));

// get from remix 
const JDPContractJson = require('../build/contracts/Vote.json');
const JDPABI = JDPContractJson.abi;
// get from remix after deploy
const ContractAddress = '0x05f232F23369fa76021D95A8dFBfFB1d044C1012';

const JDPContract = new web3.eth.Contract(JDPABI, ContractAddress);

// get from ganache
const address = '0xc0FEa6178d4A86EbB12D753D78F0Cb4860F93a34';
const privateKey = '62639966e6e065f78554be0b065d705952ea41689a208769e4f772f697cd7f58';

// set account 
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccounts = account.address;

const gasLimit = 6721975;
const gasPrice = 20000000000;

function callTransfer(recipient, amount) {
    return JDPContract.methods
        createEvent(0, ['0xabd9e3A669Aa5Fd54FAD41Fb19E0334d260Ad022','0x8ca761a9F36D6f87684fAd52410A4BB173d5b5dE' ])
        //.transfer(recipient , amount)
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

const addr = "0xc0FEa6178d4A86EbB12D753D78F0Cb4860F93a34"
const token = 100;
callTransfer(addr, token);
getBalance(addr).then(result => console.log(result));
