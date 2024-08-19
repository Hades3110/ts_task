import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException.js";
/**
 * Represents a customer in the mortgage processing system.
 */
export default class Customer {
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
    /**
     * Updates the customer's balance if they are eligible for a mortgage.
     * @param amount - The amount to add to the customer's balance.
     * @throws NotEligibleForMortgageException if the customer is not eligible for a mortgage.
     */
    updateBalance(amount) {
        if (this.isEligibleForMortgage(amount))
            this.balance += amount;
        else
            throw new NotEligibleForMortgageException();
    }
    /**
     * Determines if the customer is eligible for a mortgage based on the requested amount.
     * @param amountRequested - The amount of the mortgage requested.
     * @returns true if the customer is eligible; false otherwise.
     */
    isEligibleForMortgage(amountRequested) {
        let isEligibleForMortgage = false;
        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;
        return isEligibleForMortgage;
    }
}
//# sourceMappingURL=Customer.js.map