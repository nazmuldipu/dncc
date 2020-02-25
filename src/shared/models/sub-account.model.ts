export class SubAccount {
    public employeeId: string;
    public fiscalYearId: string;
    public month: number;
    public monthName: string;
    public selfDeduction: number;
    public organizationalContribution: number;
    public advanceDeduction: number;
    public advanceReturn: number;
    public extraDeduction: number;
    constructor(
        employeeId?: string,
        fiscalYearId?: string,
        month?: number,
        monthName?: string,
        selfDeduction?: number,
        organizationalContribution?: number,
        advanceDeduction?: number,
        advanceReturn?: number,
        extraDeduction?: number,
    ) { }
}