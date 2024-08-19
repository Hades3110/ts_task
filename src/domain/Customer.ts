import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";

interface Customer {
    id: number,
    firstName: string,
    lastName: string,
    balance: number,
    badCreditHistoryCount: number,
}

class Customer implements Customer {
    id: number;
    firstName: string;
    lastName: string;
    balance: number;
    badCreditHistoryCount: number;

    constructor(id: number, firstName: string, lastName: string, balance: number, badCreditHistoryCount: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.badCreditHistoryCount = badCreditHistoryCount;
    }

    static MESSAGE_NOT_ELIGIBLE_FOR_MORTGAGE: string = 'Not eligible for mortgage exception!';

    updateBalance(amount: number): void {
        if (this.isEligibleForMortgage(amount)) {
            this.balance += amount;
        } else {

            throw new NotEligibleForMortgageException(Customer.MESSAGE_NOT_ELIGIBLE_FOR_MORTGAGE);
        }
    }

isEligibleForMortgage(amountRequested: number): boolean {
    let isEligibleForMortgage: boolean = false;

    if (this.badCreditHistoryCount === 0 && this.balance > 0)
        isEligibleForMortgage = this.balance * 2 >= amountRequested;

    return isEligibleForMortgage;
}
}

export default Customer
