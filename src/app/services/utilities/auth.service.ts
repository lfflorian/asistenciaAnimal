import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { User } from 'app/model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth,
    private userService: UserService) { }

  async RegisterWithEmail(user: User, password: string) {
    await this.afa.auth.createUserWithEmailAndPassword(user.Email, password).then(async (data) => {
      data.user.sendEmailVerification();
      return this.userService.createUser(user).then(async (result) => {
        result;
      }, (error) => {
        console.log(error)
      });
    });
  }

  LoginWithEmail(email: string, password: string) {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  resetPasswordInit(email: string) {
    return this.afa.auth.sendPasswordResetEmail(email, { url: 'https://suscripcionmuv.firebaseapp.com/web/login' });
  }

  getCurrentUser() {
    return this.afa.auth.currentUser;
  }

  getUser() {
    return this.afa.auth;
  }
  getStatus() {
    return this.afa.authState;
  }
}
