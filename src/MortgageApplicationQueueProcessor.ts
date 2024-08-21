import  WrongDataException from './exceptions/WrongDataException';

export default class MortgageApplicationQueueProcessor {

    private customerRepository: any

    constructor(customerRepository:string) {
        this.customerRepository = customerRepository;
    }

    static MESSAGE_INVALID_CUSTOMER: string = 'Customer not found!';

    checkWrongData(customer:any):void{
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }

    processRequest(customerId:number, amountRequested: number):void {
        this.updateBalance(customerId, amountRequested);
    }
    private updateBalance(customerId:number, amountRequested:number):void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }
    private getCustomer(customerId:number) {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}


