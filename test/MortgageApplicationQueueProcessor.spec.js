"use strict";
exports.__esModule = true;
var assert_1 = require("assert");
var MortgageApplicationQueueProcessor_1 = require("../src/MortgageApplicationQueueProcessor");
var Customer_1 = require("../src/domain/Customer");
var NotEligibleForMortgageException_1 = require("../src/exceptions/NotEligibleForMortgageException");
var WrongDataException_1 = require("../src/exceptions/WrongDataException");
describe('MortgageApplicationQueueProcessor', function () {
    var customerRepositoryMock = {};
    var process = function (customerId, amountRequested, customerRepositoryMock) {
        var processor = new MortgageApplicationQueueProcessor_1["default"](customerRepositoryMock);
        try {
            processor.processRequest(customerId, amountRequested);
        }
        catch (e) {
            if (e instanceof NotEligibleForMortgageException_1["default"])
                return;
            throw e;
        }
    };
    describe('happy path test', function () {
        [
            [1, 1000, 0, 500, 1500],
            [2, 240, 0, 100, 340],
            [3, 0, 0, 400, 0],
            [4, 500, 1, 1000, 500]
        ].forEach(function (_a) {
            var customerId = _a[0], balance = _a[1], badCreditHistoryCount = _a[2], amountRequested = _a[3], expected = _a[4];
            it("given a customerId " + customerId + " when is valid then request is processed", function () {
                var customer = new Customer_1["default"](customerId, 'first', 'last', balance, badCreditHistoryCount);
                customerRepositoryMock.get = function () { return customer; };
                process(customerId, amountRequested, customerRepositoryMock);
                assert_1["default"].strictEqual(customer.balance, expected);
            });
        });
    });
    describe('unhappy path test', function () {
        it("given a customerId when not valid then request fails", function () {
            var customerId = 1000;
            var amountRequested = 1500;
            customerRepositoryMock.get = function () { return null; };
            assert_1["default"].throws(function () { return process(customerId, amountRequested, customerRepositoryMock); }, WrongDataException_1["default"]);
        });
    });
});
