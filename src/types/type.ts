import Customer from "../domain/Customer";

interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
  badCreditHistoryCount: number;
  updateBalance: (amount: number) => void;
  // isEligibleForMortgage: (amountRequested: number) => boolean;
}

type CustomerRepository = {
  get: (customerId: number) => Customer | null;
};

export { CustomerRepository, CustomerModel };
