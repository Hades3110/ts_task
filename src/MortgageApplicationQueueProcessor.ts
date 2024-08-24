const WrongDataException = require('./exceptions/WrongDataException');
const {Customer} = require('./domain/Customer');

type CustomerReader = InstanceType<typeof Customer>

class MortgageApplicationQueueProcessor {
    private customerRepository:{get : (id:number) => CustomerReader | null};
    constructor(customerRepository:{get : (id:number) => CustomerReader}) {
        this.customerRepository = customerRepository;
    }

     private static readonly MESSAGE_INVALID_CUSTOMER:string = 'Customer not found!';

    checkWrongData(customer:CustomerReader): void{
        if (!customer)
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }

    processRequest(customerId: number, amountRequested:number): void {
        this.updateBalance(customerId, amountRequested);
    }
    updateBalance(customerId:number, amountRequested : number) : void {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }
    getCustomer(customerId:number): CustomerReader {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}

module.exports = MortgageApplicationQueueProcessor;