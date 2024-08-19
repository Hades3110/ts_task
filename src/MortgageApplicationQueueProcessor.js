"use strict";
exports.__esModule = true;
var WrongDataException_1 = require("./exceptions/WrongDataException");
var MortgageApplicationQueueProcessor = /** @class */ (function () {
    function MortgageApplicationQueueProcessor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    MortgageApplicationQueueProcessor.prototype.checkWrongData = function (customer) {
        if (!customer)
            throw new WrongDataException_1["default"](MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
    };
    MortgageApplicationQueueProcessor.prototype.processRequest = function (customerId, amountRequested) {
        this.updateBalance(customerId, amountRequested);
    };
    MortgageApplicationQueueProcessor.prototype.updateBalance = function (customerId, amountRequested) {
        var customer = this.getCustomer(customerId);
        if (customer) {
            customer.updateBalance(amountRequested);
        }
    };
    MortgageApplicationQueueProcessor.prototype.getCustomer = function (customerId) {
        var customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    };
    MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER = 'Customer not found!';
    return MortgageApplicationQueueProcessor;
}());
exports["default"] = MortgageApplicationQueueProcessor;
