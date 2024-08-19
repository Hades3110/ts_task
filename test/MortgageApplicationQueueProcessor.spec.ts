import assert from "assert";
import Customer from "../src/domain/Customer";
import NotEligibleForMortgageException from "../src/exceptions/NotEligibleForMortgageException";
import MortgageApplicationQueueProcessor from "../src/MortgageApplicationQueueProcessor";
import { ICustomerRepository } from "../src/types/interfaces/customRepository";
import { WrongDataErrorMessages } from "../src/types/enums/wrongDataErrorMessages";


describe("MortgageApplicationQueueProcessor", () => {
  let customerRepositoryMock: ICustomerRepository;

  const process = (
    customerId: number,
    amountRequested: number,
    customerRepositoryMock: ICustomerRepository
  ) => {
    const processor = new MortgageApplicationQueueProcessor(
      customerRepositoryMock
    );
    try {
      processor.processRequest(customerId, amountRequested);
    } catch (e) {
      if (e instanceof NotEligibleForMortgageException) return;

      throw e;
    }
  };

  describe("happy path test", () => {
    [
      [1, 1000, 0, 500, 1500],
      [2, 240, 0, 100, 340],
      [3, 0, 0, 400, 0],
      [4, 500, 1, 1000, 500],
    ].forEach(
      ([
        customerId,
        balance,
        badCreditHistoryCount,
        amountRequested,
        expected,
      ]) => {
        it(`given a customerId ${customerId} when is valid then request is processed`, () => {
          const customer = new Customer(
            customerId,
            "first",
            "last",
            balance,
            badCreditHistoryCount
          );
          customerRepositoryMock.get = () => customer;

          process(customerId, amountRequested, customerRepositoryMock);
          assert.strictEqual(customer.balance, expected);
        });
      }
    );
  });

  describe("unhappy path test", () => {
    it(`given a customerId when not valid then request fails`, () => {
      const customerId = 1000;
      const amountRequested = 1500;

      customerRepositoryMock.get = () => null;

      assert.throws(
        () => process(customerId, amountRequested, customerRepositoryMock),
        WrongDataErrorMessages.INVALID_CUSTOMER_DATA
      );
    });
  });
});
