export interface CustomerInterface {
  id: string;
  firstName: string;
  lastName: string;
  balance: number;
  badCreditHistoryCount: number;

  updateBalance(amount: number): void;
}

export interface CustomerRepositoryInterface {
  get(customerId: string): CustomerInterface | undefined;
}
