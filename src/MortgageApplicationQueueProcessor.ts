const WrongDataException = require("./exceptions/WrongDataException");

interface Customer {
  updateBalance(amount: number): void;
}

type NullableCustomer = Customer | null;

interface CustomerRepository {
  get(customerId: number): NullableCustomer;
}

class MortgageApplicationQueueProcessor {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  private static readonly MESSAGE_INVALID_CUSTOMER = "Customer not found!";

  private checkWrongData(customer: NullableCustomer): void {
    if (!customer)
      throw new WrongDataException(
        MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER
      );
  }

  processRequest(customerId: number, amountRequested: number): void {
    this.updateBalance(customerId, amountRequested);
  }
  private updateBalance(customerId: number, amountRequested: number): void {
    const customer = this.getCustomer(customerId);
    customer?.updateBalance(amountRequested);
  }
  private getCustomer(customerId: number): Customer {
    const customer = this.customerRepository.get(customerId);
    this.checkWrongData(customer);
    return customer as Customer;
  }
}

module.exports = MortgageApplicationQueueProcessor;
