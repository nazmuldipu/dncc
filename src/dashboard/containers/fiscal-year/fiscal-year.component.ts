import { Component, OnInit } from '@angular/core';
import { FiscalYearService } from 'src/services/fiscal-year.service';
import { UtilService } from 'src/services/util.service';
import { FiscalYear } from 'src/shared/models/fiscal-year.model';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.scss']
})
export class FiscalYearComponent implements OnInit {
  fiscalYear: FiscalYear;
  fiscalYearList: FiscalYear[] = [];

  loadingData = false;
  sendingData = false;
  errorMessage = "";

  constructor(private utilService: UtilService, private fiscalYearService: FiscalYearService) { }

  ngOnInit() {
    this.getAllFiscalYear();
  }

  async getAllFiscalYear() {
    this.loadingData = true;
    await this.fiscalYearService.fiscalYears$.subscribe(data => {
      if (data.length) {
        this.fiscalYearList = data;
        this.fiscalYearList.sort(this.utilService.dynamicSortObject('serialNo'));
        this.loadingData = false;
      } else {
        this.fiscalYearService.getAll()
          .subscribe(data => {
            this.fiscalYearList = data;
            this.fiscalYearList.sort(this.utilService.dynamicSortObject('serialNo'));
            this.loadingData = false;
          });
      }
    })
  }

  onEdit(id) {
    this.fiscalYear = this.fiscalYearList.find(cp => cp.id === id);
  }

  async onCreate(event: FiscalYear) {
    this.sendingData = true;
    await this.fiscalYearService.create(event)
      .then(data => {
        console.log(data);
        if (event.prevId) {
          const value = this.fiscalYearList.find(fyl => fyl.id == event.prevId);
          value.nextId = data.id;
          this.fiscalYear.id = event.prevId;
          this.onUpdate(value);
        }

        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "FiscalYear SAVING ERROR ! ", error;
      });
    this.clear();
  }

  async onUpdate(event: FiscalYear) {
    this.sendingData = true;
    await this.fiscalYearService.update(this.fiscalYear.id, event)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "FiscalYear Updating ERROR ! ", error;
      });
    this.clear();
  }

  onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete FiscalYear')) {
      this.fiscalYearService.delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          this.errorMessage = "FiscalYear Deleting ERROR ! ", error;
        });
      this.clear();
    }
  }

  clear() {
    this.fiscalYear = new FiscalYear();
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
