import { NotEligibleForMortgageException } from '../exceptions/NotEligibleForMortgageException';

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    balance: number;
    badCreditHistoryCount: number;
    updateBalance?: (amount: number) => void;

}

type CustomerParams = Omit<ICustomer, 'id'> & { id: number };

class Customer implements ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    balance: number;
    badCreditHistoryCount: number;

    constructor({ id, firstName, lastName, balance, badCreditHistoryCount }: CustomerParams) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.badCreditHistoryCount = badCreditHistoryCount;
    }

    updateBalance(amount: number): void {
        if (this.isEligibleForMortgage(amount)) {
            this.balance += amount;
        } else {
            throw new NotEligibleForMortgageException();
        }
    }

    isEligibleForMortgage(amountRequested: number): boolean {
        return this.badCreditHistoryCount === 0 && this.balance * 2 >= amountRequested;
    }
}

const customer = new Customer({ 
    id: 1, 
    firstName: 'John', 
    lastName: 'Doe', 
    balance: 1000, 
    badCreditHistoryCount: 0 
});
console.log({customer})

export default Customer
