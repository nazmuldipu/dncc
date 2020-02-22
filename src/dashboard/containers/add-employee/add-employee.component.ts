import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/shared/models/employee.model';
import { UtilService } from 'src/services/util.service';
import { EmployeeService } from 'src/services/employee.service';
import { Zone } from 'src/shared/models/zone.model';
import { ZoneService } from 'src/services/zone.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee;
  zoneList: Zone[] = [];

  loadingData = false;
  sendingData = false;
  errorMessage = "";

  constructor(private utilService: UtilService, private employeeService: EmployeeService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.getAllZone();
  }

  async getAllZone() {
    this.loadingData = true;
    await this.zoneService.zones$.subscribe(data => {
      if (data.length) {
        this.zoneList = data;
        this.zoneList.sort(this.utilService.dynamicSortObject('serialNo'));
        this.loadingData = false;
      } else {
        this.zoneService.getAll()
          .subscribe(data => {
            this.zoneList = data;
            this.zoneList.sort(this.utilService.dynamicSortObject('serialNo'));
            this.loadingData = false;
          });
      }
    })
  }

  async onCreate(event: Employee) {
    this.sendingData = true;
    await this.employeeService.create(event)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Employee SAVING ERROR ! ", error;
      });
    this.clear();
  }

  async onUpdate(event: Employee) {
    this.sendingData = true;
    // const value = { companyId: this.companyId, ...event }
    await this.employeeService.update(this.employee.id, event)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Employee Updating ERROR ! ", error;
      });
    this.clear();
  }

  onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete Employee')) {
      this.employeeService.delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          this.errorMessage = "Zone Deleting ERROR ! ", error;
        });
      this.clear();
    }
  }

  clear() {
    this.employee = new Employee();
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }

}
//empId