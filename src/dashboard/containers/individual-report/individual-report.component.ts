import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AccountService } from 'src/services/account.service';
import { EmployeeService } from 'src/services/employee.service';
import { FiscalYearService } from 'src/services/fiscal-year.service';
import { UtilService } from 'src/services/util.service';
import { Employee } from 'src/shared/models/employee.model';
import { FiscalYear } from 'src/shared/models/fiscal-year.model';
import { Accounts } from 'src/shared/models/account.model';

@Component({
  selector: 'app-individual-report',
  templateUrl: './individual-report.component.html',
  styleUrls: ['./individual-report.component.scss']
})
export class IndividualReportComponent implements OnInit {
  account: Accounts;
  employee: Employee;
  employeeList: Employee[] = [];

  fiscalYear: FiscalYear;
  fiscalYearList: FiscalYear[] = [];

  serialNumber = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০", "১১", "১২", "১৩", "১৪", "১৫", "১৬", "১৭", "১৮", "১৯", "২০", "২১"];
  monthName = ["জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন"];

  message = '';
  loadingData = false;
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
      this.getEmployeeAccount(this.employee.id, this.fiscalYear.id);
    }
  }

  onSelectFiscalYear(event) {
    this.fiscalYear = this.fiscalYearList.find(fy => fy.id == event);
    if (this.employee) {
      this.getEmployeeAccount(this.employee.id, this.fiscalYear.id);
    }
  }

  async getEmployeeAccount(empId, fyId) {
    this.account = null;
    await this.accountService.getByEmployeeIdAndFiscalYearId(empId, fyId).subscribe(data => {
      if (data.length) {
        this.account = data[0];
      } else {
        this.message = 'No account information yet';
      }
    })
  }

  onPrint() {
    (window as any).print('height=600,width=800');
  }
}
