import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from 'src/shared/models/employee.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Zone } from 'src/shared/models/zone.model';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnChanges {
  @Input() employee: Employee;
  @Input() zoneList: Zone[];

  @Output() create = new EventEmitter<Employee>();
  @Output() update = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = "";
  exists = false;
  mouseoverShifting = false;
  minDate: any;
  maxDate: any;

  constructor(private fb: FormBuilder) {
    this.createForm()
    this.minDate = { year: 1940, month: 1, day: 1 };
    const dd = new Date();
    this.maxDate = { year: dd.getFullYear(), month: dd.getMonth(), day: dd.getDate() }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.employee != null && this.employee.id != null) {
      this.exists = true;
      this.form.patchValue(this.employee);
    }
  }

  createForm() {
    this.form = this.fb.group({
      empId: ["", Validators.required],
      zone: ["", Validators.required],
      name: ["", Validators.required],
      fatehrName: ["",],
      designation: ["", Validators.required],
      phone: ["",],
      dateOfBirth: ["",],
      selfDeduction: ["", Validators.required],
      organizationalContribution: ["", Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.exists) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
      this.form.reset();
    }
  }

  onDelete(id) {
    this.delete.emit(id);
    this.clear()
  }

  clear() {
    this.employee = new Employee();
    this.errorMessage = '';
    this.exists = false;
    this.form.reset();
  }

  getFormValidationErrors() {
    let errors = '';
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors += key + ' : ' + keyError + '; ';
        });
      }
    });
    return errors;
  }

}
