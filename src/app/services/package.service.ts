import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';
import { Package } from 'app/model/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  Model : string = "Paquete";
  private crudService: FirestoreCrudService<Package>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Package>(afs, this.Model);
  }

  getPackages() {
    return this.crudService.list();
  }
}
