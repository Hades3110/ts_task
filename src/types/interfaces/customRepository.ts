import Customer from "../../domain/Customer";

export interface ICustomerRepository {
  get(customerId?: number): Customer | null;
}
