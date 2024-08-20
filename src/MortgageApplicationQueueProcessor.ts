import Customer from "./domain/Customer";
import WrongDataException from "./exceptions/WrongDataException";
import { CustomerRepository } from "./types/type";

export default class MortgageApplicationQueueProcessor {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  private static readonly MESSAGE_INVALID_CUSTOMER = "Customer not found!";

  private checkWrongData(customer: Customer | null): void {
    if (!customer) {
      throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    }
  }

  public processRequest(customerId: number, amountRequested: number): void {
    this.updateBalance(customerId, amountRequested);
  }

  private updateBalance(customerId: number, amountRequested: number): void {
    const customer = this.getCustomer(customerId);
    customer.updateBalance(amountRequested);
  }

  private getCustomer(customerId: number): Customer {
    const customer = this.customerRepository.get(customerId);
    this.checkWrongData(customer);
    return customer as Customer;
  }
}
