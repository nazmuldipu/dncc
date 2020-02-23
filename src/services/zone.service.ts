import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Zone } from 'src/shared/models/zone.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  serviceUrl = 'zone';

  private _zoneSource = new BehaviorSubject<Zone[]>([]);
  zones$ = this._zoneSource.asObservable();
  zones: Zone[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  getAndStoreAll() {
    this.getAll().subscribe(data => {
      this._zoneSource.next(data);
    })
  }

  create(zone: Zone) {
    delete zone["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...zone
    });
  }

  getAll(): Observable<Zone[]> {
    return this.afs.collection(this.serviceUrl).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Zone;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  get(cid) {
    return this.afs.doc(this.serviceUrl + '/' + cid).valueChanges();
  }



  update(zid, zone: Zone) {
    delete zone["id"]
    return this.afs.doc(this.serviceUrl + '/' + zid).update({
      ...zone
    });
  }

  delete(zid) {
    return this.afs.doc(this.serviceUrl + '/' + zid).delete();
  }
}
