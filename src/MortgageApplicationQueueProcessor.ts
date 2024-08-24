import { CustomerRepositoryInterface, CustomerInterface } from './types';
const WrongDataException = require('./exceptions/WrongDataException');

export default class MortgageApplicationQueueProcessor {
  private customerRepository: CustomerRepositoryInterface;
  private static readonly MESSAGE_INVALID_CUSTOMER = 'Customer not found!';

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  private checkWrongData(customer: CustomerInterface | undefined): void {
    if (!customer) {
      throw new WrongDataException(
        MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER
      );
    }
  }

  public processRequest(customerId: string, amountRequested: number): void {
    this.updateBalance(customerId, amountRequested);
  }

  private updateBalance(customerId: string, amountRequested: number): void {
    const customer = this.getCustomer(customerId);
    customer.updateBalance(amountRequested);
  }

  private getCustomer(customerId: string): CustomerInterface {
    const customer = this.customerRepository.get(customerId);
    this.checkWrongData(customer);
    return customer as CustomerInterface;
  }
}

module.exports = MortgageApplicationQueueProcessor;
