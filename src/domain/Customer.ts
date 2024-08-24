import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";

interface Customer {
    id: number,
    firstName: string,
    lastName: string,
    balance: number,
    badCreditHistoryCount: number,
}

class Customer implements Customer {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public balance: number,
        public badCreditHistoryCount: number
    ) {}

    private static readonly MESSAGE_NOT_ELIGIBLE_FOR_MORTGAGE = 'Not eligible for mortgage exception!';

    updateBalance(amount: number): void {
        if (this.isEligibleForMortgage(amount)) {
            this.balance += amount;
        } else {

            throw new NotEligibleForMortgageException(Customer.MESSAGE_NOT_ELIGIBLE_FOR_MORTGAGE);
        }
    }

isEligibleForMortgage(amountRequested: number): boolean {
    let isEligibleForMortgage = false;

    if (this.badCreditHistoryCount === 0 && this.balance > 0)
        isEligibleForMortgage = this.balance * 2 >= amountRequested;

    return isEligibleForMortgage;
}
}

export default Customer
