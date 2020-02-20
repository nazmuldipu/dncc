import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from 'src/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serviceUrl = 'users';

  constructor(private afs: AngularFirestore) { }

  create(user) {
    return this.afs.collection(this.serviceUrl).add(user);
  }

  saveRegisteredUser(uid, name, email, password) {
    return this.afs.collection(this.serviceUrl).doc(uid).set({
      name: name,
      email: email,
      password: password,
      role: 'USER'
    });
  }

  saveUser(uid, user: User) {
    return this.afs.collection(this.serviceUrl).doc(uid).set({
      ...user
    });
  }

  get(uid) {
    return this.afs.doc(this.serviceUrl + '/' + uid).valueChanges();
  }

  getAll() {
    return this.afs.collection(this.serviceUrl).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  update(uid, user: User) {
    delete user["id"]
    return this.afs.doc(this.serviceUrl + '/' + uid).update({
      ...user
    });
  }

  delete(uid) {
    return this.afs.doc(this.serviceUrl + '/' + uid).delete();
  }
}
