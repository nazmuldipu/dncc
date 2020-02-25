import { SubAccount } from './sub-account.model';

export class Accounts {
    id: string;
    employeeId: string;
    fiscalYearId: string;
    subAccountList: SubAccount[];
    previousYearLoan: number;
    subTotal: number[];
    total: number;
    currentYearInterest: number;
    lastYearBalance: number;
    lastYearInterest: number;
    currentYearBalance: number;
    grandTotal: number;
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