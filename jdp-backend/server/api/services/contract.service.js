import l from '../../common/logger';
import { web3Config } from '../../common/web3';

const web3 = web3Config();
// get from remix
const JDPContractJson = require('../../../contract/Vote.json');
const JDPABI = JDPContractJson.abi;
// get from remix after deploy
const ContractAddress = process.env.CONTRACT_ADDRESS;

const JDPContract = new web3.eth.Contract(JDPABI, ContractAddress);

function setWeb3AccountWallet() {
  const account = web3.eth.accounts.privateKeyToAccount(
    `0x${process.env.JDP_PRIVATE_KEY}`
  );
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
}

class ContractService {
  async callTransfer(recipient, amount) {
    setWeb3AccountWallet();
    return (
      JDPContract.methods
        //.createEvent(0, ['0xabd9e3A669Aa5Fd54FAD41Fb19E0334d260Ad022','0x8ca761a9F36D6f87684fAd52410A4BB173d5b5dE' ])
        .transfer(recipient, amount)
        .send({
          from: process.env.JDP_ADDRESS,
          gas: web3.utils.toHex(process.env.GAS_LIMIT),
          gasPrice: web3.utils.toHex(process.env.GAS_PRICE),
        })
        .then((receipt) => {
          console.log('receipt ', receipt);
          return receipt;
        })
        .catch((error) => {
          throw error;
        })
    );
  }

  async callBalanceOf(account) {
    return JDPContract.methods.balanceOf(account).call();
  }

  async callCreateEvent(eventId, candidates) {
    setWeb3AccountWallet();
    return JDPContract.methods
      .createEvent(eventId, candidates)
      .send({
        from: process.env.JDP_ADDRESS,
        gas: web3.utils.toHex(process.env.GAS_LIMIT),
        gasPrice: web3.utils.toHex(process.env.GAS_PRICE),
      })
      .then((receipt) => {
        console.log('receipt ', receipt);
        return receipt;
      })
      .catch((error) => {
        throw error;
      });
  }

  async callEventList(eventId) {
    return JDPContract.methods.eventList(eventId).call();
  }

  async callStartVoting(eventId) {
    setWeb3AccountWallet();
    return JDPContract.methods
      .startVoting(eventId)
      .send({
        from: process.env.JDP_ADDRESS,
        gas: web3.utils.toHex(process.env.GAS_LIMIT),
        gasPrice: web3.utils.toHex(process.env.GAS_PRICE),
      })
      .then((receipt) => {
        console.log('receipt ', receipt);
        return receipt;
      })
      .catch((error) => {
        throw error;
      });
  }

  async callStopVoting(eventId) {
    setWeb3AccountWallet();
    return JDPContract.methods
      .stopVoting(eventId)
      .send({
        from: process.env.JDP_ADDRESS,
        gas: web3.utils.toHex(process.env.GAS_LIMIT),
        gasPrice: web3.utils.toHex(process.env.GAS_PRICE),
      })
      .then((receipt) => {
        console.log('receipt ', receipt);
        return receipt;
      })
      .catch((error) => {
        throw error;
      });
  }

  async callSetRefundable(eventId) {
    setWeb3AccountWallet();
    return JDPContract.methods
      .setRefundable(eventId)
      .send({
        from: process.env.JDP_ADDRESS,
        gas: web3.utils.toHex(process.env.GAS_LIMIT),
        gasPrice: web3.utils.toHex(process.env.GAS_PRICE),
      })
      .then((receipt) => {
        console.log('receipt ', receipt);
        return receipt;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default new ContractService();
