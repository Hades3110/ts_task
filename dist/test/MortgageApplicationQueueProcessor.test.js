"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const MortgageApplicationQueueProcessor_1 = __importDefault(require("../MortgageApplicationQueueProcessor"));
const Customer_1 = __importDefault(require("../domain/Customer"));
const NotEligibleForMortgageException = require('../exceptions/NotEligibleForMortgageException');
const WrongDataException = require('../exceptions/WrongDataException');
describe('MortgageApplicationQueueProcessor', () => {
    let customerRepositoryMock = {};
    const process = (customerId, amountRequested, customerRepositoryMock) => {
        const processor = new MortgageApplicationQueueProcessor_1.default(customerRepositoryMock);
        try {
            processor.processRequest(customerId, amountRequested);
        }
        catch (e) {
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
        ].forEach(([customerId, balance, badCreditHistoryCount, amountRequested, expected,]) => {
            it(`given a customerId ${customerId} when valid then request is processed`, () => {
                const customer = new Customer_1.default(customerId, 'first', 'last', balance, badCreditHistoryCount);
                customerRepositoryMock.get = () => customer;
                process(customerId, amountRequested, customerRepositoryMock);
                assert_1.default.strictEqual(customer.balance, expected);
            });
        });
    });
    describe('unhappy path test', () => {
        it('given a customerId when not valid then request fails', () => {
            const customerId = '1000';
            const amountRequested = 1500;
            customerRepositoryMock.get = () => undefined;
            assert_1.default.throws(() => process(customerId, amountRequested, customerRepositoryMock), WrongDataException);
        });
    });
});
