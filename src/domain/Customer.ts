import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    balance: number;
    badCreditHistoryCount: number;
    updateBalance(amount: number): void;
    isEligibleForMortgage(amountRequested: number): boolean;
}

export class Customer implements ICustomer {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public balance: number,
        public badCreditHistoryCount: number
    ) {}

    updateBalance(amount: number): void {
        if (this.isEligibleForMortgage(amount)) {
            this.balance += amount;
        } else {
            throw new NotEligibleForMortgageException('Error');
        }
    }

    isEligibleForMortgage(amountRequested: number): boolean {
        let isEligibleForMortgage: boolean = false;

        if (this.badCreditHistoryCount === 0 && this.balance > 0) {
            isEligibleForMortgage = this.balance * 2 >= amountRequested;
        }

        return isEligibleForMortgage;
    }
}
