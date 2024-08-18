import { ICustomerRepository, IMortgageApplicationQueueProcessor } from "@interfaces/mortgage-application.interface";
import { ICustomer } from "@interfaces/customer.interface";

const WrongDataException = require('./exceptions/WrongDataException');

class MortgageApplicationQueueProcessor implements IMortgageApplicationQueueProcessor {
    private customerRepository: ICustomerRepository;
    static readonly MESSAGE_INVALID_CUSTOMER: string = 'Customer not found!';

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    public checkWrongData(customer: ICustomer | undefined): void {
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
    }

    public processRequest(customerId: number, amountRequested: number): void {
        this.updateBalance(customerId, amountRequested);
    }

    public updateBalance(customerId: number, amountRequested: number): void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }

    public getCustomer(customerId: number): ICustomer {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer as ICustomer;
    }
}

module.exports = MortgageApplicationQueueProcessor;
