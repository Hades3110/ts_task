import WrongDataException from "./exceptions/WrongDataException";
import Customer from "./domain/Customer";
import { ICustomerRepository } from "./types/interfaces/customRepository";
import { WrongDataErrorMessages } from "./types/enums/wrongDataErrorMessages";

export default class MortgageApplicationQueueProcessor {
  private readonly customerRepository: ICustomerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  private static readonly MESSAGE_INVALID_CUSTOMER = WrongDataErrorMessages.INVALID_CUSTOMER_DATA

  private checkWrongData(customer: Customer) {
    if (!customer)
      throw new WrongDataException(
        MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER
      );
  }

  public processRequest(customerId: number, amountRequested: number) {
    this.updateBalance(customerId, amountRequested);
  }
  private updateBalance(customerId: number, amountRequested: number) {
    const customer = this.getCustomer(customerId);
    customer?.updateBalance(amountRequested);
  }
  private getCustomer(customerId: number) {
    const customer = this.customerRepository.get(customerId);
    if (customer) this.checkWrongData(customer);
    return customer;
  }
}
