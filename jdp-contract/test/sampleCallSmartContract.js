'use strict'
const Web3 = require('web3');

const provider = "https://besutest.chainz.network";

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

let web3 = new Web3(new Web3.providers.HttpProvider(provider, setJwtToken()));

// get from remix 
const JDPContractJson = require('../build/contracts/Vote.json');
const JDPABI = JDPContractJson.abi;
// get from remix after deploy
const ContractAddress = '0x545f1836F9F768D0a09F3a1073C1A556075aA08B';

const JDPContract = new web3.eth.Contract(JDPABI, ContractAddress);

// get from ganache
const address = '0x45a4176b1EF305666461061c28f04fe7157CE7Fe';
const privateKey = '0x89f71e1cdab6bbca7f8d3e7181bfaebd16e5df6a2047403bf2847e8064525318';

// set account 
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccounts = account.address;

//const GAS_LIMIT = 6721975;
//const GAS_PRICE = 20000000000;

const GAS_LIMIT=1237312
const GAS_PRICE=0

function callTransfer(recipient, amount) {
    return JDPContract.methods
        //.createEvent(0, ['0xabd9e3A669Aa5Fd54FAD41Fb19E0334d260Ad022','0x8ca761a9F36D6f87684fAd52410A4BB173d5b5dE' ])
        .transfer(recipient , amount)
        .send({
            from: address,
            gas: web3.utils.toHex(GAS_LIMIT),
            gasPrice: web3.utils.toHex(GAS_PRICE),
        })
        .then(receipt => {
            // console.log('receipt ', receipt);
            //return receipt;
        })
        .catch(error => {
            console.error(error);
        })
}

function getBalance(addr){
    return JDPContract.methods.balanceOf(addr).call();
}

const addr = "0xCEc484086A370116BD5c6fd98B9C3F252a82dB88"
const token = 100;
callTransfer(addr, token);
//getBalance(addr).then(result => console.log(result));
JDPContract.methods.eventList(0).call().then(result => console.log(result));