import WrongDataException from "./exceptions/WrongDataException";
import {ICustomer} from "./domain/Customer"

interface CustomerRepo {
    get(customerId: number): ICustomer;
}
export class MortgageApplicationQueueProcessor {
    private customerRepository:CustomerRepo
    constructor(customerRepository:CustomerRepo) {
        this.customerRepository = customerRepository;
    }

    static readonly MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

    checkWrongData(customer:ICustomer):void{
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }

    processRequest(customerId:number, amountRequested:number):void {
        this.updateBalance(customerId, amountRequested);
    }
    updateBalance(customerId:number, amountRequested:number):void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }
    getCustomer(customerId:number) {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}

