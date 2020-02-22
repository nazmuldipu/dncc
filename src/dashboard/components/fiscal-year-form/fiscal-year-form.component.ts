import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FiscalYear } from 'src/shared/models/fiscal-year.model';

@Component({
  selector: 'fiscal-year-form',
  templateUrl: './fiscal-year-form.component.html',
  styleUrls: ['./fiscal-year-form.component.scss']
})
export class FiscalYearFormComponent implements OnChanges {
  @Input() fiscalYear: FiscalYear;
  @Input() fiscalYearList: FiscalYear[];

  @Output() create = new EventEmitter<FiscalYear>();
  @Output() update = new EventEmitter<FiscalYear>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = "";
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fiscalYear != null && this.fiscalYear.id != null) {
      this.exists = true;
      this.form.patchValue(this.fiscalYear);
    }
  }

  createForm() {
    this.form = this.fb.group({
      serialNo: ["", Validators.required],
      name: ["", Validators.required],
      prevId: ["", Validators.required]
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
    this.fiscalYear = new FiscalYear();
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
