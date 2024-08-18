import { ICustomer } from "@interfaces/customer.interface";

export interface ICustomerRepository {
    get(customerId: number): ICustomer | undefined;
}

export interface IMortgageApplicationQueueProcessor {
    processRequest(customerId: number, amountRequested: number): void;
    updateBalance(customerId: number, amountRequested: number): void;
    getCustomer(customerId: number): ICustomer;
    checkWrongData(customer: ICustomer | undefined): void;
}