import { Injectable } from '@angular/core';
import { User } from 'app/model/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Model : string = "Usuario";
  private crudService: FirestoreCrudService<User>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<User>(afs, this.Model);
  }

  createUser(user: User) {
    return this.crudService.add(user);
  }

  getUsers() {
    return this.crudService.list();
  }

  getUser(id : string) {
    return this.crudService.get(id);
  }

  updateUser(user: User) {
    return this.crudService.update(user);
  }

  deleteUser(id : string) {
    return this.crudService.delete(id);
  }
}
