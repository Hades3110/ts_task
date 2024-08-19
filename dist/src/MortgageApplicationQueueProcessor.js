import WrongDataException from './exceptions/WrongDataException.js';
/**
 * Processes mortgage application requests.
 */
export default class MortgageApplicationQueueProcessor {
    customerRepository;
    static MESSAGE_INVALID_CUSTOMER = 'Customer not found!';
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    /**
     * Checks if the retrieved customer data is valid.
     * @param customer - The customer data to check.
     * @throws WrongDataException if the customer data is invalid.
     */
    checkWrongData(customer) {
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }
    /**
     * Processes the mortgage request for a given customer ID and amount.
     * @param customerId - The ID of the customer requesting a mortgage.
     * @param amountRequested - The amount of the mortgage requested.
     */
    processRequest(customerId, amountRequested) {
        this.updateBalance(customerId, amountRequested);
    }
    /**
     * Updates the customer's balance after checking their eligibility for the requested mortgage.
     * @param customerId - The ID of the customer requesting a mortgage.
     * @param amountRequested - The amount of the mortgage requested.
     */
    updateBalance(customerId, amountRequested) {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }
    /**
     * Retrieves a customer by ID from the repository and checks for valid data.
     * @param customerId - The ID of the customer to retrieve.
     * @returns The customer if found.
     * @throws WrongDataException if the customer is not found.
     */
    getCustomer(customerId) {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}
//# sourceMappingURL=MortgageApplicationQueueProcessor.js.map