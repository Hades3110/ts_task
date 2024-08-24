"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotEligibleForMortgageException = require('../exceptions/NotEligibleForMortgageException');
class Customer {
    id;
    firstName;
    lastName;
    balance;
    badCreditHistoryCount;
    constructor(id, firstName, lastName, balance, badCreditHistoryCount) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.badCreditHistoryCount = badCreditHistoryCount;
    }
    updateBalance(amount) {
        if (this.isEligibleForMortgage(amount)) {
            this.balance += amount;
        }
        else {
            throw new NotEligibleForMortgageException();
        }
    }
    isEligibleForMortgage(amountRequested) {
        return (this.badCreditHistoryCount === 0 && this.balance * 2 >= amountRequested);
    }
}
exports.default = Customer;
