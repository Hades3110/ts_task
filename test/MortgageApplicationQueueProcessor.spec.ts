import assert from 'assert';
import MortgageApplicationQueueProcessor, {CustomerRepository} from "../src/MortgageApplicationQueueProcessor.js";
import Customer from "../src/domain/Customer.js";
import NotEligibleForMortgageException from "../src/exceptions/NotEligibleForMortgageException.js";
import WrongDataException from "../src/exceptions/WrongDataException.js";

describe('MortgageApplicationQueueProcessor', () => {
    let customerRepositoryMock: CustomerRepository;

    beforeEach(() => {
        customerRepositoryMock = {
            get: () => null,
        };
    });

    const process = (customerId: number, amountRequested: number, customerRepositoryMock: CustomerRepository): void => {
        const processor: MortgageApplicationQueueProcessor = new MortgageApplicationQueueProcessor(customerRepositoryMock);
        try {
            processor.processRequest(customerId, amountRequested);
        } catch (e) {
            if (e instanceof NotEligibleForMortgageException)
                return;

            throw e;
        }
    };

    describe('happy path test', () => {
        [
            [1, 1000, 0, 500, 1500],
            [2, 240, 0, 100, 340],
            [3, 0, 0, 400, 0],
            [4, 500, 1, 1000, 500]
        ].forEach(([customerId, balance, badCreditHistoryCount, amountRequested, expected]) => {
            it(`given a customerId ${customerId} when is valid then request is processed`, () => {
                const customer: Customer = new Customer(customerId, 'first', 'last', balance, badCreditHistoryCount);
                customerRepositoryMock.get = (id) => id === customerId ? customer : null;

                process(customerId, amountRequested, customerRepositoryMock);
                assert.strictEqual(customer.balance, expected);
            });
        });
    });

    describe('unhappy path test', () => {
        it(`given a customerId when not valid then request fails`, () => {
            const customerId: number = 1000;
            const amountRequested: number = 1500;

            customerRepositoryMock.get = () => null;

            assert.throws(
                () => process(customerId, amountRequested, customerRepositoryMock),
                WrongDataException
            );
        });
    });
});
