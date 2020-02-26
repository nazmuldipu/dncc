import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Advance } from 'src/shared/models/account.model';

@Component({
  selector: 'advance-form',
  templateUrl: './advance-form.component.html',
  styleUrls: ['./advance-form.component.scss']
})
export class AdvanceFormComponent {
  @Output() create = new EventEmitter<Advance>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      issueDate: ["", Validators.required],
      checkNumber: ["", Validators.required],
      amount: ["", Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
      this.form.reset();
    }
  }

}
