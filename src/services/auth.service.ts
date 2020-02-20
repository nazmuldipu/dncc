import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/shared/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  public _userSource = new BehaviorSubject<User>(new User());
  currentUser$ = this._userSource.asObservable();
  currentUser: User;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  getUser$() {
    return this.user$;
  }

  register(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(data => {
        console.log('SIGNOUT');
      })
      .catch(error => {
        console.log('SIGNOUT ERROR', error);
      })
  }
}
