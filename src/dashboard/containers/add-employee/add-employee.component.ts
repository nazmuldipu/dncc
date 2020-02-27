import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/shared/models/employee.model';
import { UtilService } from 'src/services/util.service';
import { EmployeeService } from 'src/services/employee.service';
import { Zone } from 'src/shared/models/zone.model';
import { ZoneService } from 'src/services/zone.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  id: number;
  employee: Employee;
  zoneList: Zone[] = [];

  loadingData = false;
  sendingData = false;
  message = '';
  errorMessage = "";

  constructor(private utilService: UtilService,
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute,
    private zoneService: ZoneService) {
    this.id = activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getAllZone();
    if (this.id) {
      this.getEmployee(this.id);
    }
  }

  getEmployee(id) {
    this.employeeService.employees$.subscribe(data => {
      if (data.length > 0) {
        this.employee = data.find(d => d.id == id);
      } else {
        this.employeeService.get(id).subscribe(data => {
          this.employee = { id: id, ...data };
        });
      }
    })

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
    this.message = '';
    this.sendingData = true;
    await this.employeeService.create(event)
      .then(() => {
        this.sendingData = false;
        this.message = "কর্মকর্তা সংযোজন সম্পন্ন হয়েছে";
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Employee SAVING ERROR ! ", error;
      });
  }

  async onUpdate(event: Employee) {
    this.sendingData = true;
    // const value = { companyId: this.companyId, ...event }
    await this.employeeService.update(this.employee.id, event)
      .then(() => {
        this.sendingData = false;
        this.message = "কর্মকর্তা হালনাগাদ সম্পন্ন হয়েছে"
        this.employee = null;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Employee Updating ERROR ! ", error;
      });

  }

  onDelete(id) {
    this.sendingData = true;
    if (confirm('আপনি কি কর্মচারীকে মুছে ফেলার বিষয়ে নিশ্চিত?')) {
      this.employeeService.delete(id)
        .then(() => {
          this.sendingData = false;
          this.message = "কর্মকর্তা মুছে ফেলা হয়েছে";
        })
        .catch((error) => {
          this.sendingData = false;
          this.errorMessage = "Zone Deleting ERROR ! ", error;
        });

    }
  }

  clear() {
    this.employee = new Employee();
    this.errorMessage = '';
    this.message = '';
    this.sendingData = false;
    this.loadingData = false;
  }

}
//empId