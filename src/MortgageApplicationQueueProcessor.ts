import { WrongDataException } from './exceptions/WrongDataException';

interface Customer {
    updateBalance: (amount: number) => void;
}

interface CustomerRepository {
    get: (id: string) => Customer | null;
}

class MortgageApplicationQueueProcessor {
    private static readonly MESSAGE_INVALID_CUSTOMER = 'Customer not found!';
    private customerRepository: CustomerRepository;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }


    private checkWrongData(customer: Customer | null): void {
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
    }

    public processRequest(customerId: string | number, amountRequested: string | number): void {
        this.updateBalance(String(customerId), +amountRequested);
    }

    private updateBalance(customerId: string, amountRequested: number): void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }

    private getCustomer(customerId: string): Customer {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer as Customer;
    }
}

export { MortgageApplicationQueueProcessor };
