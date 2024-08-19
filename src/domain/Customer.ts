import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException.js";

/**
 * Represents a customer in the mortgage processing system.
 */
export default class Customer {
    constructor(
        private id: number,
        public firstName: string,
        public lastName: string,
        public balance: number,
        private badCreditHistoryCount: number
    ) {}

    /**
     * Updates the customer's balance if they are eligible for a mortgage.
     * @param amount - The amount to add to the customer's balance.
     * @throws NotEligibleForMortgageException if the customer is not eligible for a mortgage.
     */
    updateBalance(amount: number): void {
        if(this.isEligibleForMortgage(amount))
            this.balance += amount;
        else
            throw new NotEligibleForMortgageException();
    }

    /**
     * Determines if the customer is eligible for a mortgage based on the requested amount.
     * @param amountRequested - The amount of the mortgage requested.
     * @returns true if the customer is eligible; false otherwise.
     */
    private isEligibleForMortgage(amountRequested: number): boolean {
        let isEligibleForMortgage: boolean = false;

        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;

        return isEligibleForMortgage;
    }
}