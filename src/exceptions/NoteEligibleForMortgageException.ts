module.exports = class NotEligibleForMortgageException extends Error {
    constructor(message:string) {
        super(message);
        this.name = 'NotEligibleForMortgageException';

        Object.setPrototypeOf(this, NotEligibleForMortgageException.prototype);
    }
}