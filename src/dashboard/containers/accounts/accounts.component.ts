import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { UtilService } from 'src/services/util.service';
import { Employee } from 'src/shared/models/employee.model';
import { FiscalYearService } from 'src/services/fiscal-year.service';
import { FiscalYear } from 'src/shared/models/fiscal-year.model';
import { AccountService } from 'src/services/account.service';
import { Accounts, Advance } from 'src/shared/models/account.model';
import { SubAccount } from 'src/shared/models/sub-account.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  edit = false;
  exists = false;
  showAdvanceForm = false;
  currentYearInterestRate = 13;
  previousYearInterestRate = 13;
  monthlySubscription;
  numberOfMonth = 0;
  account: Accounts;
  employee: Employee;
  fiscalYear: FiscalYear;
  employeeList: Employee[] = [];
  fiscalYearList: FiscalYear[] = [];
  loadingData = false;
  serialNumber = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০", "১১", "১২", "১৩", "১৪", "১৫", "১৬", "১৭", "১৮", "১৯", "২০"];
  monthName = ["জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন"];

  formatter = (employee: Employee) => employee.name;
  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter(emp => new RegExp(term, 'mi').test(emp.empId)).slice(0, 10))
  )

  constructor(private employeeService: EmployeeService,
    private fiscalYearService: FiscalYearService,
    private accountService: AccountService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.getAllEmployee();
    this.getAllFiscalYear();
  }

  async getAllEmployee() {
    this.loadingData = true;
    await this.employeeService.employees$.subscribe(data => {
      if (data.length) {
        this.employeeList = data;
        this.employeeList.sort(this.utilService.dynamicSortObject('empId'));
        this.loadingData = false;
      } else {
        this.employeeService.getAll()
          .subscribe(data => {
            this.employeeList = data;
            this.employeeList.sort(this.utilService.dynamicSortObject('empId'));
            this.loadingData = false;
          });
      }
    });
  }

  async getAllFiscalYear() {
    this.loadingData = true;
    await this.fiscalYearService.fiscalYears$.subscribe(data => {
      if (data.length) {
        this.fiscalYearList = data;
        this.fiscalYearList.sort(this.utilService.dynamicSortObject('serialNo'));
        this.fiscalYear = this.fiscalYearList.find(fy => fy.active == true);
        this.loadingData = false;
      } else {
        this.fiscalYearService.getAll()
          .subscribe(data => {
            this.fiscalYearList = data;
            this.fiscalYearList.sort(this.utilService.dynamicSortObject('serialNo'));
            this.fiscalYear = this.fiscalYearList.find(fy => fy.active == true);
            this.loadingData = false;
          });
      }
    })
  }

  searchEmployee(event) {
    this.employee = event.item;
    if (this.fiscalYear) {
      this.edit = false;
      this.exists = false;
      this.getEmployeeAccount(this.employee.id, this.fiscalYear.id);
    }
  }

  onSelectFiscalYear(event) {
    this.fiscalYear = this.fiscalYearList.find(fy => fy.id == event);
    if (this.employee) {
      this.edit = false;
      this.exists = false;
      this.getEmployeeAccount(this.employee.id, this.fiscalYear.id);
    }
  }

  onPrint() {
    (window as any).print('height=600,width=800');
  }

  async getEmployeeAccount(empId, fyId) {
    await this.accountService.getByEmployeeIdAndFiscalYearId(empId, fyId).subscribe(data => {
      if (data.length) {
        this.account = data[0];
        this.exists = true;
      } else {
        const subAccountList = this.getNewSubaccountList(empId, fyId);
        const subTotal = this.getSubTotal(subAccountList);
        const total = this.getTotal(subTotal);
        const currentYearInterest = Number((this.currentYearInterestRate * total / 100).toFixed(2));
        const lastYearBalance = 500;//TODO
        const lastYearInterest = Number((this.previousYearInterestRate * lastYearBalance / 100).toFixed(2));
        const grandTotal = total + currentYearInterest + lastYearBalance + lastYearInterest
        this.account = {
          id: null,
          employeeId: empId,
          fiscalYearId: fyId,
          subAccountList: subAccountList,
          subTotal: subTotal,
          previousYearLoan: 0,
          total: total,
          currentYearInterest: currentYearInterest, //TODO: dynamic interest rate
          lastYearBalance: lastYearBalance, //TODO: dynamic lastYear Balance rate
          lastYearInterest: lastYearInterest,
          currentYearBalance: lastYearBalance,
          grandTotal: grandTotal
        } as Accounts;
      }
    })
  }

  getNewSubaccountList(empId, fyId): SubAccount[] {
    const value: SubAccount[] = [];
    for (let i = 0; i < 12; i++) {
      let sb = {
        employeeId: empId,
        fiscalYearId: fyId,
        month: i,
        monthName: this.monthName[i],
        selfDeduction: Number(this.employee.selfDeduction.toFixed(2)),
        organizationalContribution: Number(this.employee.organizationalContribution.toFixed(2)),
        advanceDeduction: 0,
        advanceReturn: 0,
        extraDeduction: 0
      } as SubAccount;
      value.push(sb);
    }
    return value;
  }

  getSubTotal(sba: SubAccount[]): number[] {
    let self = 0, org = 0, advD = 0, advR = 0, ext = 0;
    for (let i = 0; i < sba.length; i++) {
      self += sba[i].selfDeduction;
      org += sba[i].organizationalContribution;
      advD += sba[i].advanceDeduction;
      advR += sba[i].advanceReturn;
      ext += sba[i].extraDeduction;
    }
    const res: number[] = [self, org, advD, advR, ext];
    return res;
  }

  getTotal(n: number[]): number {
    if (n.length == 5) {
      return n[0] + n[1] + n[2] - n[3] + n[4];
    }
    return 0;
  }

  updateTotal() {
    this.numberOfMonth = 0;
    this.account.subAccountList.forEach(sa => {
      if (sa.selfDeduction > 0) {
        this.numberOfMonth++;
      }
    });

    this.account.currentYearBalance = this.account.lastYearBalance;
    this.account.lastYearInterest = this.calculateLastYearInterest();//Number((this.account.currentYearBalance * 13 / 100).toFixed(2));
    this.account.subTotal = this.getSubTotal(this.account.subAccountList);
    this.account.total = this.getTotal(this.account.subTotal);
    this.account.currentYearInterest = Number(((this.employee.selfDeduction + this.employee.organizationalContribution) * (this.numberOfMonth + 1) * this.currentYearInterestRate / 200).toFixed(2));
    this.account.grandTotal = Number((this.account.total + this.account.currentYearInterest + this.account.lastYearBalance + this.account.lastYearInterest).toFixed(2));
    this.account.currentLoanStatus = this.account.previousYearLoan - this.account.subTotal[2] + this.account.subTotal[3];
  }

  calculateLastYearInterest(): number {
    let lastBalance = this.account.currentYearBalance;
    let amount = 0;
    this.account.subAccountList.forEach(sa => {
      if (sa.advanceReturn > 0) {
        lastBalance -= sa.advanceReturn;
      }
      amount += Number((lastBalance * this.previousYearInterestRate / 1200).toFixed(2));
    })
    return Number(amount.toFixed(2));
  }

  async save() {
    await this.accountService.create(this.account).then(() => {
      this.account = null;
      this.employee = null;
      this.edit = false;
      this.exists = false;
      this.showAdvanceForm = false;
    })
  }

  async update() {
    await this.accountService.update(this.account.id, this.account).then(() => {
      this.account = null;
      this.employee = null;
      this.edit = false;
      this.exists = false;
      this.showAdvanceForm = false;
    })
  }

  onShowAdvanceForm() {
    this.showAdvanceForm = true;
    this.edit = true;
  }

  onCreateAdvance(event: Advance) {
    this.showAdvanceForm = false;
    // this.edit = false;
    let month = ((event.issueDate.month + 6) % 12) - 1;
    if (!this.account.advances) this.account.advances = [];
    this.account.advances.push(event);
    this.account.subAccountList[month].advanceReturn = event.amount;
    this.updateTotal();
  }
}
