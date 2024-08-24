import WrongDataException from "./exceptions/WrongDataException";
import { ICustomer } from "./domain/Customer";

interface CustomerRepo {
    get(customerId: number): ICustomer;
}

export class MortgageApplicationQueueProcessor {
    private customerRepository: CustomerRepo;

    constructor(customerRepository: CustomerRepo) {
        this.customerRepository = customerRepository;
    }

    static readonly MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

    private checkWrongData(customer: ICustomer): void {
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
    }

    processRequest(customerId: number, amountRequested: number): void {
        this.updateBalance(customerId, amountRequested);
    }

    private updateBalance(customerId: number, amountRequested: number): void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }

    private getCustomer(customerId: number): ICustomer {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}
