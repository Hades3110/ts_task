import assert from 'assert';
import MortgageApplicationQueueProcessor from '../MortgageApplicationQueueProcessor';
import Customer from '../domain/Customer';
import { CustomerRepositoryInterface, CustomerInterface } from '../types';

const NotEligibleForMortgageException = require('../exceptions/NotEligibleForMortgageException');
const WrongDataException = require('../exceptions/WrongDataException');

describe('MortgageApplicationQueueProcessor', () => {
  let customerRepositoryMock: Partial<CustomerRepositoryInterface> = {};

  const process = (
    customerId: string,
    amountRequested: number,
    customerRepositoryMock: Partial<CustomerRepositoryInterface>
  ): void => {
    const processor = new MortgageApplicationQueueProcessor(
      customerRepositoryMock as CustomerRepositoryInterface
    );
    try {
      processor.processRequest(customerId, amountRequested);
    } catch (e) {
      if (e instanceof NotEligibleForMortgageException) {
        return;
      }
      throw e;
    }
  };

  describe('happy path test', () => {
    [
      ['1', 1000, 0, 500, 1500],
      ['2', 240, 0, 100, 340],
      ['3', 0, 0, 400, 0],
      ['4', 500, 1, 1000, 500],
    ].forEach(
      ([
        customerId,
        balance,
        badCreditHistoryCount,
        amountRequested,
        expected,
      ]) => {
        it(`given a customerId ${customerId} when valid then request is processed`, () => {
          const customer = new Customer(
            customerId as string,
            'first',
            'last',
            balance as number,
            badCreditHistoryCount as number
          );
          customerRepositoryMock.get = () => customer;

          process(
            customerId as string,
            amountRequested as number,
            customerRepositoryMock
          );
          assert.strictEqual(customer.balance, expected);
        });
      }
    );
  });

  describe('unhappy path test', () => {
    it('given a customerId when not valid then request fails', () => {
      const customerId = '1000';
      const amountRequested = 1500;

      customerRepositoryMock.get = () => undefined;

      assert.throws(
        () => process(customerId, amountRequested, customerRepositoryMock),
        WrongDataException
      );
    });
  });
});
