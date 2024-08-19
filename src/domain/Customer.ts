import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";
import { MortgageErrorMessages } from "../types/enums/mortgageErrorMessages";
import { ICustomer } from "../types/interfaces/customer";

export default class Customer implements ICustomer {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public balance: number,
    public badCreditHistoryCount: number
  ) {}
  
  public updateBalance(amount: number) {
    if (this.isEligibleForMortgage(amount)) {
      this.balance += amount;
    } else {
      throw new NotEligibleForMortgageException(
        MortgageErrorMessages.INSUFFICIENT_FUNDS
      );
    }
  }

  private isEligibleForMortgage(amountRequested: number): boolean {
    let isEligibleForMortgage = false;

    if (this.badCreditHistoryCount === 0 && this.balance > 0)
      isEligibleForMortgage = this.balance * 2 >= amountRequested;

    return isEligibleForMortgage;
  }
}
