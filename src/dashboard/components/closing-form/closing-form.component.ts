import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClosingAccount } from 'src/shared/models/account.model';

@Component({
  selector: 'closing-form',
  templateUrl: './closing-form.component.html',
  styleUrls: ['./closing-form.component.scss']
})
export class ClosingFormComponent implements OnChanges {
  @Input() closingAccount: ClosingAccount;

  @Output() create = new EventEmitter<ClosingAccount>();

  form: FormGroup;
  minDate: any;
  maxDate: any;

  constructor(private fb: FormBuilder) {
    this.createForm()
    this.minDate = { year: 1940, month: 1, day: 1 };
    const dd = new Date();
    this.maxDate = { year: (dd.getFullYear() + 1), month: dd.getMonth(), day: dd.getDate() }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.closingAccount != null) {
      this.form.patchValue(this.closingAccount);
    }
  }

  createForm() {
    this.form = this.fb.group({
      accountNo: ["", Validators.required],
      nomineeName: [""],
      joiningDate: [""],
      retirementDate: [""],
      basicSalary: [""],
      providentFundInfo: this.fb.group({
        issueDate: [""],
        checkNumber: [""],
        amount: [""]
      }),
      gratuityInfo: this.fb.group({
        issueDate: [""],
        checkNumber: [""],
        amount: [""]
      }),
      oneTimePaymenInfo: this.fb.group({
        issueDate: [""],
        checkNumber: [""],
        amount: [""]
      }),
    });
  }

  submit() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
      this.form.reset();
    }
  }

}
