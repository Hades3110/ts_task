"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotEligibleForMortgageException extends Error {
    constructor(message) {
        super(message);
        this.name = "NotEligibleForMortgageException";
    }
}
exports.default = NotEligibleForMortgageException;
