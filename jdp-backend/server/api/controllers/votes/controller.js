import ContractService from '../../services/contract.service';

const State = { OPEN: 0, CLOSED: 1, REFUNDABLE: 2 };

export class Controller {
  async sendToken(req) {
    const { recipient, amount } = req.query;
    return await ContractService.callTransfer(recipient, amount);
  }

  async getToken(req) {
    const { account } = req.query;
    return await ContractService.callBalanceOf(account);
  }

  async createEvent(req) {
    const { eventId, candidates } = req.body;
    return await ContractService.callCreateEvent(eventId, candidates);
  }

  async getEventInfo(req) {
    const { eventId } = req.query;
    return await ContractService.callEventList(eventId);
  }

  async sendReward(req) {
    const { eventId, amount } = req.query;
    return await ContractService.callFundReward(eventId, amount);
  }

  async changeEventState(req) {
    const { eventId, state } = req.query;

    switch(state){
      case State.OPEN:
        return await ContractService.callStartVoting(eventId);
      case State.CLOSED:
        return await ContractService.callStopVoting(eventId);
      case State.REFUNDABLE:
        return await ContractService.callSetRefundable(eventId);
      default:
        throw 'state is not support';
    }
  }

  async getEventState(req) {
    const { account } = req.query;
    return await ContractService.call(account);
  }
}
export default new Controller();
