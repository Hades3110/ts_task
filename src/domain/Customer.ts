import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";
import { MortgageErrorMessages } from "../types/enums/mortgageErrorMessages";
import { ICustomer } from "../types/interfaces/customer";


export default class Customer implements ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
  badCreditHistoryCount: number;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    balance: number,
    badCreditHistoryCount: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.balance = balance;
    this.badCreditHistoryCount = badCreditHistoryCount;
  }

  updateBalance(amount: number) {
    if (this.isEligibleForMortgage(amount)) {
      this.balance += amount;
    } else {
      throw new NotEligibleForMortgageException(MortgageErrorMessages.INSUFFICIENT_FUNDS);
    }
  }

  isEligibleForMortgage(amountRequested: number): boolean {
    let isEligibleForMortgage = false;

    if (this.badCreditHistoryCount === 0 && this.balance > 0)
      isEligibleForMortgage = this.balance * 2 >= amountRequested;

    return isEligibleForMortgage;
  }
}
