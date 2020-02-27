import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Accounts } from 'src/shared/models/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl = 'accounts';

  private _accountSource = new BehaviorSubject<Accounts[]>([]);
  accounts$ = this._accountSource.asObservable();
  accounts: Accounts[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  getAndStoreAll() {
    this.getAll().subscribe(data => {
      this._accountSource.next(data);
    })
  }

  create(account: Accounts) {
    delete account["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...account
    });
  }

  getAll(): Observable<Accounts[]> {
    return this.afs.collection(this.serviceUrl).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Accounts;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  get(id): Observable<any> {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  getByEmployeeIdAndFiscalYearId(employeeId, fiscalYearId): Observable<Accounts[]> {
    return this.afs.collection(this.serviceUrl, ref =>
      ref.where('employeeId', '==', employeeId).where('fiscalYearId', '==', fiscalYearId)).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Accounts;
          const id = a.payload.doc.id;
          return { id, ...data };
        })));
  }

  getByFiscalYearId(fiscalYearId): Observable<Accounts[]> {
    return this.afs.collection(this.serviceUrl, ref =>
      ref.where('fiscalYearId', '==', fiscalYearId)).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Accounts;
          const id = a.payload.doc.id;
          return { id, ...data };
        })));
  }

  getByEmployeeId(employeeId): Observable<Accounts[]> {
    return this.afs.collection(this.serviceUrl, ref =>
      ref.where('employeeId', '==', employeeId)).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Accounts;
          const id = a.payload.doc.id;
          return { id, ...data };
        })));
  }

  update(id, account: Accounts) {
    delete account["id"]
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...account
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
