import { WrongDataException } from './exceptions/WrongDataException';
import { ICustomer } from './domain/Customer'; 

interface ICustomerRepository {
    get(customerId: string): ICustomer | null;
}

export class MortgageApplicationQueueProcessor {
    customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    static MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

    checkWrongData(customer: ICustomer | null): void {
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
    }

    processRequest(customerId: string, amountRequested: number): void {
        this.updateBalance(customerId, amountRequested);
    }

    updateBalance(customerId: string, amountRequested: number): void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance?.(amountRequested);
    }

    getCustomer(customerId: string): ICustomer {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer!;
    }
}
