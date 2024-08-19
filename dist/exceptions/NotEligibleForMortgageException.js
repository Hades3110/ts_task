"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotEligibleForMortgageException = void 0;
class NotEligibleForMortgageException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotEligibleForMortgageException';
    }
}
exports.NotEligibleForMortgageException = NotEligibleForMortgageException;
