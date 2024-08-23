import WrongDataException from "./exceptions/WrongDataException";

export class MortgageApplicationQueueProcessor {
    customerRepository:any
    constructor(customerRepository:any) {
        this.customerRepository = customerRepository;
    }

    static MESSAGE_INVALID_CUSTOMER:string = 'Customer not found!';

    checkWrongData(customer:any):void{
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }

    processRequest(customerId:number, amountRequested:number):void {
        this.updateBalance(customerId, amountRequested);
    }
    updateBalance(customerId:number, amountRequested:number):void {
        const customer:any = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }
    getCustomer(customerId:number) :any {
        const customer:any = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}

