import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";

export default class Customer {
    constructor(private readonly id: number, public firstName: string, public lastName:string , private balance: number, private badCreditHistoryCount: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
        this.badCreditHistoryCount = badCreditHistoryCount;
    }

    private updateBalance(amount: number): void {
       if(this.isEligibleForMortgage(amount)){
           this.balance += amount;
       }else{
           throw new NotEligibleForMortgageException('');
       }
    }

    isEligibleForMortgage(amountRequested:number): boolean {
        let isEligibleForMortgage:boolean = false;

        if (this.badCreditHistoryCount === 0 && this.balance > 0)
            isEligibleForMortgage = this.balance * 2 >= amountRequested;

        return isEligibleForMortgage;
    }
}
