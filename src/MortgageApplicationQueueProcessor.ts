import WrongDataException from './exceptions/WrongDataException.js';
import Customer from "./domain/Customer.js";

/**
 * Interface representing a customer repository with a method to get customers by ID.
 */
export interface CustomerRepository {
    get: (id: number) => Customer | null;
}

/**
 * Processes mortgage application requests.
 */
export default class MortgageApplicationQueueProcessor {
    static MESSAGE_INVALID_CUSTOMER: string = 'Customer not found!';

    constructor(private customerRepository: CustomerRepository) {}

    /**
     * Checks if the retrieved customer data is valid.
     * @param customer - The customer data to check.
     * @throws WrongDataException if the customer data is invalid.
     */
    private checkWrongData(customer: Customer | null): void{
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }

    /**
     * Processes the mortgage request for a given customer ID and amount.
     * @param customerId - The ID of the customer requesting a mortgage.
     * @param amountRequested - The amount of the mortgage requested.
     */
    processRequest(customerId: number, amountRequested: number): void {
        this.updateBalance(customerId, amountRequested);
    }

    /**
     * Updates the customer's balance after checking their eligibility for the requested mortgage.
     * @param customerId - The ID of the customer requesting a mortgage.
     * @param amountRequested - The amount of the mortgage requested.
     */
    private updateBalance(customerId: number, amountRequested: number): void {
        const customer: Customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }

    /**
     * Retrieves a customer by ID from the repository and checks for valid data.
     * @param customerId - The ID of the customer to retrieve.
     * @returns The customer if found.
     * @throws WrongDataException if the customer is not found.
     */
    private getCustomer(customerId: number): Customer {
        const customer: Customer = this.customerRepository.get(customerId)!;
        this.checkWrongData(customer);
        return customer;
    }
}