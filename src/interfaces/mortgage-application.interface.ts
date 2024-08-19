import { ICustomer } from "@interfaces/customer.interface";

export interface ICustomerRepository {
    get(customerId: number): ICustomer | undefined;
}