import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException.js";

export default class Customer {
    constructor(
        private id: number,
        public firstName: string,
        public lastName: string,
        public balance: number,
        private badCreditHistoryCount: number
    ) {}

    updateBalance(amount: number): void {
        if(this.isEligibleForMortgage(amount))
            this.balance += amount;
        else
            throw new NotEligibleForMortgageException();
    }

    private isEligibleForMortgage(amountRequested: number): boolean {
        let isEligibleForMortgage = false;

        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;

        return isEligibleForMortgage;
    }
}