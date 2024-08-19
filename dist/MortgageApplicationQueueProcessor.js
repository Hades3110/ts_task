"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MortgageApplicationQueueProcessor = void 0;
const WrongDataException_1 = require("./exceptions/WrongDataException");
class MortgageApplicationQueueProcessor {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    checkWrongData(customer) {
        if (!customer) {
            throw new WrongDataException_1.WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
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
exports.MortgageApplicationQueueProcessor = MortgageApplicationQueueProcessor;
MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER = 'Customer not found!';
