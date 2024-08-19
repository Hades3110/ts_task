import { ICustomer } from "@interfaces/customer.interface";

const NotEligibleForMortgageException = require("../exceptions/NotEligibleForMortgageException");

module.exports = class Customer implements ICustomer {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public balance: number,
        public badCreditHistoryCount: number,
    ) {}

    public updateBalance(amount: number): void {
        if (this.isEligibleForMortgage(amount)) {
            this.balance += amount;
        } else {
            throw new NotEligibleForMortgageException('Not eligible for mortgage.');
        }
    }

    public isEligibleForMortgage(amountRequested: number): boolean {
        return this.badCreditHistoryCount === 0 && this.balance > 0 && this.balance * 2 >= amountRequested;
    }
}
