import Customer from "../domain/Customer";

interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
  badCreditHistoryCount: number;
  updateBalance: (amount: number) => void;
}

type CustomerRepository = {
  get: (customerId: number) => Customer | null;
};

export { CustomerRepository, CustomerModel };
