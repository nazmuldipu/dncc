import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from 'src/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afs: AngularFirestore) { }

  create(user) {
    return this.afs.collection('users').add(user);
  }

  saveRegisteredUser(uid, name, email, password) {
    return this.afs.collection('users').doc(uid).set({
      name: name,
      email: email,
      password: password,
      role: 'USER'
    });
  }

  saveUser(uid, user: User) {
    return this.afs.collection('users').doc(uid).set({
      ...user
    });
  }

  get(uid) {
    return this.afs.doc('users/' + uid).valueChanges();
  }

  getAll() {
    return this.afs.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  update(uid, user: User) {
    delete user["id"]
    return this.afs.doc('users/' + uid).update({
      ...user
    });
  }

  delete(uid) {
    return this.afs.doc('users/' + uid).delete();
  }
}
