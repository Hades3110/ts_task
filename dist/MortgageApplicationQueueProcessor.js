"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WrongDataException = require('./exceptions/WrongDataException');
class MortgageApplicationQueueProcessor {
    customerRepository;
    static MESSAGE_INVALID_CUSTOMER = 'Customer not found!';
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    checkWrongData(customer) {
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
    }
    processRequest(customerId, amountRequested) {
        this.updateBalance(customerId, amountRequested);
    }
    updateBalance(customerId, amountRequested) {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }
    getCustomer(customerId) {
        const customer = this.customerRepository.get(customerId);
        this.checkWrongData(customer);
        return customer;
    }
}
exports.default = MortgageApplicationQueueProcessor;
module.exports = MortgageApplicationQueueProcessor;
