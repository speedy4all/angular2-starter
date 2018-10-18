import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
  userLoggedIn: boolean = false;
  authUser: firebase.User;
  loggedInUser: string = '';

  constructor(private router: Router) {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyC2mNcZloFeCG-42Z5-MvfOYkvb1P4HXi0',
      authDomain: 'angular2-19fb0.firebaseapp.com',
      databaseURL: 'https://angular2-19fb0.firebaseio.com',
      projectId: 'angular2-19fb0',
      storageBucket: 'angular2-19fb0.appspot.com',
      messagingSenderId: '297118650514'
    };
    firebase.initializeApp(config);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    return this.verifylogin(url);
  }

  verifylogin(url: string): boolean {
    if (this.userLoggedIn) {
      return true;
    }

    this.router.navigate(['/admin/login']);
    return false;
  }

  register(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        alert(`${error.message} Please try again !`);
      });
  }

  verifyUser() {
    this.authUser = firebase.auth().currentUser;

    if (this.authUser && this.authUser.email) {
      alert(`Welcome ${this.authUser.email}`);
      this.loggedInUser = this.authUser.email;
      this.userLoggedIn = true;
      this.router.navigate(['/admin']);
    }
  }

  login(loginEmail: string, loginPassword: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .catch(function(error) {
        alert(`${error.message} Unable to login. Try Again !`);
      });
  }

  logout() {
    this.userLoggedIn = false;
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          alert(`Logged out !`);
        },
        function(error) {
          alert(`${error.message} Unable to logout. Try again !`);
        }
      );
  }
}
