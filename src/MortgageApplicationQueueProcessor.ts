import { ICustomerRepository } from "@interfaces/mortgage-application.interface";
import { ICustomer } from "@interfaces/customer.interface";

const WrongDataException = require('./exceptions/WrongDataException');

class MortgageApplicationQueueProcessor {
    private customerRepository: ICustomerRepository;
    static readonly MESSAGE_INVALID_CUSTOMER: string = 'Customer not found!';

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    private checkWrongData(customer: ICustomer | undefined): void {
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
    }

    private processRequest(customerId: number, amountRequested: number): void {
        this.updateBalance(customerId, amountRequested);
    }

    private updateBalance(customerId: number, amountRequested: number): void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }

    private getCustomer(customerId: number): ICustomer {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer as ICustomer;
    }
}

module.exports = MortgageApplicationQueueProcessor;
