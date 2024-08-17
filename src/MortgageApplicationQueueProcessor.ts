import WrongDataException from "./exceptions/WrongDataException";
import Customer from "./domain/Customer";

export interface ICustomerRepository {
  get(customerId?: number): Customer | null;
}

class MortgageApplicationQueueProcessor {
  customerRepository: ICustomerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  static MESSAGE_INVALID_CUSTOMER = "Customer not found!";

  checkWrongData(customer: Customer) {
    if (!customer)
      throw new WrongDataException(
        MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER
      );
  }

  processRequest(customerId: number, amountRequested: number) {
    this.updateBalance(customerId, amountRequested);
  }
  updateBalance(customerId: number, amountRequested: number) {
    const customer = this.getCustomer(customerId);
    customer?.updateBalance(amountRequested);
  }
  getCustomer(customerId: number) {
    const customer = this.customerRepository.get(customerId);
    if (customer) this.checkWrongData(customer);
    return customer;
  }
}

export default MortgageApplicationQueueProcessor