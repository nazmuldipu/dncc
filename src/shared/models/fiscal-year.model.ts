export class FiscalYear {
    id: string;
    prevId: string;
    nextId: string;
    serialNo: string;
    name: string;
    active: boolean;
    constructor(
        id?: string,
        name?: string,
        prevId?: string,
        nextId?: string,
        serialNo?: string
    ) { }

}