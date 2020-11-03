import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { User } from 'app/model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authState : any = null;

  constructor(private afa: AngularFireAuth,
    private userService: UserService) {
      // this.afa.authState.subscribe( authState => {
      //   console.log(authState)
      //   this.authState = authState;
      // }, error => {
      //   console.log(error)
      // });
     }

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
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  getCurrentUser() {
    return this.afa.auth.currentUser;
  }

  async getUser() {
    try {
      var user = await new Promise<any>(resolve => {
        this.afa.authState.subscribe(u => {
          resolve(u)
        });
      }) 
  
      var users = await this.userService.getUserByEmail(user.email);
      return users[0];
    } catch (error) {
      return null;
    }
  }
  getStatus() {
    return this.afa.authState;
  }
}

// referencia : https://stackoverflow.com/questions/42073340/angular2-firebase-get-current-user