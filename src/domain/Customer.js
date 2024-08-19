"use strict";
exports.__esModule = true;
var NotEligibleForMortgageException_1 = require("../exceptions/NotEligibleForMortgageException");
var Customer = /** @class */ (function () {
    function Customer(id, firstName, lastName, balance, badCreditHistoryCount) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.badCreditHistoryCount = badCreditHistoryCount;
    }
    Customer.prototype.updateBalance = function (amount) {
        if (this.isEligibleForMortgage(amount)) {
            this.balance += amount;
        }
        else {
            throw new NotEligibleForMortgageException_1["default"](Customer.MESSAGE_NOT_ELIGIBLE_FOR_MORTGAGE);
        }
    };
    Customer.prototype.isEligibleForMortgage = function (amountRequested) {
        var isEligibleForMortgage = false;
        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;
        return isEligibleForMortgage;
    };
    Customer.MESSAGE_NOT_ELIGIBLE_FOR_MORTGAGE = 'Not eligible for mortgage exception!';
    return Customer;
}());
exports["default"] = Customer;
