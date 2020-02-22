import { Injectable } from '@angular/core';
import { Employee } from 'src/shared/models/employee.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  serviceUrl = 'employee';

  private _employeeSource = new BehaviorSubject<Employee[]>([]);
  employees$ = this._employeeSource.asObservable();
  employees: Employee[] = [];

  constructor(private afs: AngularFirestore) { }

  getAndStoreAll() {
    this.getAll().subscribe(data => {
      this._employeeSource.next(data);
    })
  }

  create(employee: Employee) {
    delete employee["id"]
    return this.afs.collection(this.serviceUrl).add({
      ...employee
    });
  }

  getAll(): Observable<Employee[]> {
    return this.afs.collection(this.serviceUrl).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Employee;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  get(eid) {
    return this.afs.doc(this.serviceUrl + '/' + eid).valueChanges();
  }

  update(eid, employee: Employee) {
    delete employee["id"]
    return this.afs.doc(this.serviceUrl + '/' + eid).update({
      ...employee
    });
  }

  delete(eid) {
    return this.afs.doc(this.serviceUrl + '/' + eid).delete();
  }
}
