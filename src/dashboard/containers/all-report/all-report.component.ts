import { Component, OnInit } from '@angular/core';
import { FiscalYear } from 'src/shared/models/fiscal-year.model';
import { FiscalYearService } from 'src/services/fiscal-year.service';
import { UtilService } from 'src/services/util.service';
import { AccountService } from 'src/services/account.service';
import { Accounts } from 'src/shared/models/account.model';
import { Employee } from 'src/shared/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-all-report',
  templateUrl: './all-report.component.html',
  styleUrls: ['./all-report.component.scss']
})
export class AllReportComponent implements OnInit {
  accountList: Accounts[] = [];
  employeeList: Employee[] = [];

  fiscalYear: FiscalYear;
  fiscalYearList: FiscalYear[] = [];

  serialNumber = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০", "১১", "১২", "১৩", "১৪", "১৫", "১৬", "১৭", "১৮", "১৯", "২০"];
  monthName = ["জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে", "জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন"];

  loadingData = false;
  constructor(private employeeService: EmployeeService,
    private fiscalYearService: FiscalYearService,
    private accountService: AccountService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.getAllFiscalYear();
    this.getAllEmployee();
  }

  async getAllFiscalYear() {
    this.loadingData = true;
    await this.fiscalYearService.fiscalYears$.subscribe(data => {
      if (data.length) {
        this.fiscalYearList = data;
        this.fiscalYearList.sort(this.utilService.dynamicSortObject('serialNo'));
        this.fiscalYear = this.fiscalYearList.find(fy => fy.active == true);
        this.getAccountByFiscalYear(this.fiscalYear.id);
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

  async getAccountByFiscalYear(fyId) {
    this.loadingData = true;
    await this.accountService.getByFiscalYearId(fyId).subscribe(data => {
      this.accountList = data;
    })
  }

  onSelectFiscalYear(event) {
    this.fiscalYear = this.fiscalYearList.find(fy => fy.id == event);
    this.getAccountByFiscalYear(this.fiscalYear.id);
  }

  getEmployeeIdAndName(id) {
    const value = this.employeeList.find(el => el.id == id);
    return value ? value.empId + 'ঃ ' + value.name : '';
  }

  onPrint() {
    (window as any).print('height=600,width=800');
  }

}
