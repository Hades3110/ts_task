import WrongDataException from './exceptions/WrongDataException.js';
import Customer from "./domain/Customer.js";

export interface CustomerRepository {
    get: (id: number) => Customer | null;
}

export default class MortgageApplicationQueueProcessor {
    private static readonly MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

    constructor(private customerRepository: CustomerRepository) {}

    private checkWrongData(customer: Customer | null): void{
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }

    processRequest(customerId: number, amountRequested: number): void {
        this.updateBalance(customerId, amountRequested);
    }

    private updateBalance(customerId: number, amountRequested: number): void {
        const customer: Customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }

    private getCustomer(customerId: number): Customer {
        const customer: Customer = this.customerRepository.get(customerId)!;
        this.checkWrongData(customer);
        return customer;
    }
}