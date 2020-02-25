export class Employee {
    id: string;
    empId: string;
    name: string;
    fatehrName: string;
    phone: string;
    designation: string;
    dateOfBirth: Date;
    zone: string;
    selfDeduction: number;
    organizationalContribution: number;
    constructor(
        empId?: string,
        name?: string,
        fatehrName?: string,
        designation?: string,
        dateOfBirth?: Date,
        zone?: string,
        selfDeduction?: number,
        organizationalContribution?: number,
        phone?: string
    ) { }

}