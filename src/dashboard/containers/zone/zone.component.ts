import { Component, OnInit } from '@angular/core';
import { Zone } from 'src/shared/models/zone.model';
import { AuthService } from 'src/services/auth.service';
import { ZoneService } from 'src/services/zone.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  zone: Zone;
  zoneList: Zone[] = [];

  loadingData = false;
  sendingData = false;
  errorMessage = "";

  constructor(private utilService: UtilService, private zoneService: ZoneService) { }

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

  onEdit(id) {
    this.zone = this.zoneList.find(cp => cp.id === id);
  }

  async onCreate(event: Zone) {
    this.sendingData = true;
    await this.zoneService.create(event)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Zone SAVING ERROR ! ", error;
      });
    this.clear();
  }

  async onUpdate(event: Zone) {
    this.sendingData = true;
    // const value = { companyId: this.companyId, ...event }
    await this.zoneService.update(this.zone.id, event)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        this.errorMessage = "Zone Updating ERROR ! ", error;
      });
    this.clear();
  }

  onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete zone')) {
      this.zoneService.delete(id)
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
    this.zone = new Zone();
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
