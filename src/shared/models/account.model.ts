import { SubAccount } from './sub-account.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class Accounts {
    id: string;
    employeeId: string;
    fiscalYearId: string;
    subAccountList: SubAccount[];
    previousYearLoan: number;
    currentLoanStatus: number;
    subTotal: number[];
    total: number;
    currentYearInterest: number;
    lastYearBalance: number;
    lastYearInterest: number;
    currentYearBalance: number;
    grandTotal: number;
    advances: Advance[];
    closingAccount: ClosingAccount;
    constructor(
        id?: string,
        employeeId?: string,
        fiscalYearId?: string,
        subAccountList?: SubAccount[],
        previousYearLoan?: number,
        subTotal?: number,
        total?: number,
        currentYearInterest?: number,
        lastYearBalance?: number,
        lastYearInterest?: number,
        currentYearBalance?: number,
        grandTotal?: number
    ) { }
}

export class Advance {
    issueDate: NgbDate;
    checkNumber: string;
    amount: number;
}

export class ClosingAccount {
    accountNo: string;
    nomineeName: string;
    joiningDate: NgbDate;
    retirementDate: NgbDate;
    basicSalary: number;
    providentFundInfo: Advance;
    gratuityInfo: Advance;
    oneTimePaymenInfo: Advance;
}

