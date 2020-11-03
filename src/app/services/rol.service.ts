import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';
import { Rol } from 'app/model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  Model : string = "Rol";
  private crudService: FirestoreCrudService<Rol>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Rol>(afs, this.Model);
  }

  getRols() {
    return this.crudService.list();
  }
}
