import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
//import { User } from "../services/user";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  setState: any;

  //public afAuth: AngularFireAuth;

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', String(null));
        //JSON.parse(localStorage.getItem('user'));
      }
    })
  }


  // Sign up with email/password
  creatNewUser(email: string, password: string) {

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  async SendVerificationMail() {

    try {
      return this.afAuth.currentUser.then((user) => {
        if (user != null) {
          user.sendEmailVerification();
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  
  SignInUser(email: string, password: string) {

    return new Promise<void>(
      (resolve, reject) => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          }, (error) => {
            //window.alert(error.message);
            reject(error);
          }
        );

      }
    );
  }

  // Sign in with Google

  GoogleAuth() {
    //return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => console.log(res));
    firebase.auth().getRedirectResult().then(
      function (result) {
        // const showLoading = true;
        if (result.credential) {
          //var token = result.credential.accessToken;
          //console.log(token);
        }
        var user = result.user;
        console.log(user);
      });
    //const showLoading = true;
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithRedirect(provider);
  }

  ForgotPassword(passwordResetEmail : string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }


  signOut() {
    this.afAuth.signOut();
  }
}