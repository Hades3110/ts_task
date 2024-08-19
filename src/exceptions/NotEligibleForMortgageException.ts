class NotEligibleForMortgageException extends Error {
    name: string;

    constructor(message: string | undefined) {
        super(message);
        this.name = 'NotEligibleForMortgageException';
    }
}

export default NotEligibleForMortgageException