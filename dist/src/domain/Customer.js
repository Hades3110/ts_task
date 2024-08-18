"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotEligibleForMortgageException_1 = __importDefault(require("../exceptions/NotEligibleForMortgageException"));
class Customer {
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
            throw new NotEligibleForMortgageException_1.default();
        }
    }
    isEligibleForMortgage(amountRequested) {
        let isEligibleForMortgage = false;
        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;
        return isEligibleForMortgage;
    }
}
exports.default = Customer;
