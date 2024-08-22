const NotEligibleForMortgageException = require("../exceptions/NotEligibleForMortgageException");

interface CustomerConstructor {
    id: number;
    firstName: string;
    lastName: string;
    balance: number;
    badCreditHistoryCount: number;
    updateBalance:(amount : number) => void
}

module.exports = class Customer implements CustomerConstructor {

    // id: number;
    // firstName: string;
    // lastName: string;
    // balance: number;
    // badCreditHistoryCount: number;

    constructor(public id:number, public firstName:string, public lastName: string, public balance: number,public  badCreditHistoryCount: number) {
       
    }

    updateBalance(amount: number) : void {
       if(this.isEligibleForMortgage(amount)){
           this.balance += amount;
       }else{
           throw new NotEligibleForMortgageException();
       }
    }

    isEligibleForMortgage(amountRequested: number): boolean {
        let isEligibleForMortgage = false;

        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;

        return isEligibleForMortgage;
    }
}