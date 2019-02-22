import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../../model/user.model';
import { Constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`${Constants.FirestoreColletions.USERS}${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credendial = await this.afAuth.auth.signInWithPopup(provider);

    this.afs.firestore.doc(`${Constants.FirestoreColletions.USERS}${credendial.user.uid}`).get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          this.navigateToCorrectPage(credendial.user);
        } else {
          this.createNewUser(credendial.user);
          this.router.navigate(['/form']);
        }
      });
  }

  async singOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private navigateToCorrectPage(user: firebase.User) {
    const userRef = this.afs.doc<User>(`${Constants.FirestoreColletions.USERS}${user.uid}`);
    userRef.snapshotChanges().subscribe(e => {
      if (e.payload.data().isValid) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/form']);
      }
    });
  }

  private createNewUser(user: firebase.User) {
    const userRef = this.afs.doc<User>(`${Constants.FirestoreColletions.USERS}${user.uid}`);

    const data = {
      isValid: false,
      uid: user.uid,
      name: user.displayName
    };

    userRef.set(data, { merge: true });
  }

}
