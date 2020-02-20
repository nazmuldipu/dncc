import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Zone } from 'src/shared/models/zone.model';

@Component({
  selector: 'zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent {
  @Input() zoneList: Zone[];
  @Output() edit = new EventEmitter();

  editZone(id) {
    this.edit.emit(id);
  }

}
