import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';
import { AnimalType } from 'app/model/AnimalType';

@Injectable({
  providedIn: 'root'
})
export class AnimalTypeService {

  Model : string = "TipoAnimal";
  private crudService: FirestoreCrudService<AnimalType>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<AnimalType>(afs, this.Model);
  }

  getAnimalTypes() {
    return this.crudService.list();
  }
}
