import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Zone } from 'src/shared/models/zone.model';

@Component({
  selector: 'zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnChanges {
  @Input() zone: Zone;

  @Output() create = new EventEmitter<Zone>();
  @Output() update = new EventEmitter<Zone>();
  @Output() delete = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = "";
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.zone != null && this.zone.id != null) {
      this.exists = true;
      this.form.patchValue(this.zone);
    }
  }

  createForm() {
    this.form = this.fb.group({
      serialNo: ["", Validators.required],
      name: ["", Validators.required],
      nameBd: ["", Validators.required],
      note: ["", Validators.required],
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
    this.zone = new Zone();
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
