"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const NotEligibleForMortgageException_1 = require("../exceptions/NotEligibleForMortgageException");
class Customer {
    constructor({ id, firstName, lastName, balance, badCreditHistoryCount }) {
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
            throw new NotEligibleForMortgageException_1.NotEligibleForMortgageException('Customer is not eligible for a mortgage.');
        }
    }
    isEligibleForMortgage(amountRequested) {
        return this.badCreditHistoryCount === 0 && this.balance * 2 >= amountRequested;
    }
}
exports.Customer = Customer;
