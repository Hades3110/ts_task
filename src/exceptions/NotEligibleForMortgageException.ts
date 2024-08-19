import { MortgageErrorMessages } from "../types/enums/mortgageErrorMessages";

export default class NotEligibleForMortgageException extends Error {
  constructor(message: MortgageErrorMessages) {
    super(message);
    this.name = MortgageErrorMessages.NOT_ELIGIBLE_FOR_MORTGAGE_EXCEPTION
  }
}
