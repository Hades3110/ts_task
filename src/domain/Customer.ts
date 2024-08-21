const NotEligibleForMortgageException = require('../exceptions/NotEligibleForMortgageException');
import { CustomerInterface } from '../types';

export default class Customer implements CustomerInterface {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public balance: number,
    public badCreditHistoryCount: number
  ) {}

  updateBalance(amount: number): void {
    if (this.isEligibleForMortgage(amount)) {
      this.balance += amount;
    } else {
      throw new NotEligibleForMortgageException();
    }
  }

  isEligibleForMortgage(amountRequested: number): boolean {
    return (
      this.badCreditHistoryCount === 0 && this.balance * 2 >= amountRequested
    );
  }
}
