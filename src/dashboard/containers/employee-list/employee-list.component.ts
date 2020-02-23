import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/services/employee.service';
import { UtilService } from 'src/services/util.service';
import { Employee } from 'src/shared/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [];

  loadingData = false;
  sendingData = false;

  constructor(private utilService: UtilService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getAllEmployee();
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

  editEmployee(id) {
    this.router.navigate(['/dashboard/add-employee', id]);
  }

}
