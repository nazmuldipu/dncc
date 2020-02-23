import { Injectable } from '@angular/core';
import { FiscalYear } from 'src/shared/models/fiscal-year.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiscalYearService {
  serviceUrl = 'fiscalYear';

  private _fiscalYearSource = new BehaviorSubject<FiscalYear[]>([]);
  fiscalYears$ = this._fiscalYearSource.asObservable();
  fiscalYears: FiscalYear[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  getAndStoreAll() {
    this.getAll().subscribe(data => {
      this._fiscalYearSource.next(data);
    })
  }

  create(fiscalYear: FiscalYear) {
    delete fiscalYear["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...fiscalYear
    });
  }

  getAll(): Observable<FiscalYear[]> {
    return this.afs.collection(this.serviceUrl).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FiscalYear;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  get(fid) {
    return this.afs.doc(this.serviceUrl + '/' + fid).valueChanges();
  }



  update(fid, fiscalYear: FiscalYear) {
    delete fiscalYear["id"]
    return this.afs.doc(this.serviceUrl + '/' + fid).update({
      ...fiscalYear
    });
  }

  delete(fid) {
    return this.afs.doc(this.serviceUrl + '/' + fid).delete();
  }
}
