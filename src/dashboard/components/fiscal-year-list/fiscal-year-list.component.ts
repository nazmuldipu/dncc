import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiscalYear } from 'src/shared/models/fiscal-year.model';

@Component({
  selector: 'fiscal-year-list',
  templateUrl: './fiscal-year-list.component.html',
  styleUrls: ['./fiscal-year-list.component.scss']
})
export class FiscalYearListComponent {
  @Input() fiscalYearList: FiscalYear[];
  @Output() edit = new EventEmitter();

  editFiscalYear(id) {
    this.edit.emit(id);
  }

  getFiscalYearName(id) {
    const value = this.fiscalYearList.find(fyl => fyl.id == id);
    if (!!value) return value.name;
    return '';
  }
}
