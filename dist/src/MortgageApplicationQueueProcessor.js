"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WrongDataException_1 = __importDefault(require("./exceptions/WrongDataException"));
class MortgageApplicationQueueProcessor {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    checkWrongData(customer) {
        if (!customer) {
            throw new WrongDataException_1.default(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
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
MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER = "Customer not found!";
exports.default = MortgageApplicationQueueProcessor;
