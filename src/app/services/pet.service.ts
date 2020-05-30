import { Injectable } from '@angular/core';
import { Pet } from 'app/model/pet';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  Model : string = "Mascota";
  private crudService: FirestoreCrudService<Pet>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Pet>(afs, this.Model);
  }

  createPet(pet: Pet) {
    return this.crudService.add(pet);
  }

  getPets() {
    return this.crudService.list();
  }

  getPetsByReference(id : string) {
    return this.crudService.listByReference(id,'IdUser');
  }

  getPet(id : string) {
    return this.crudService.get(id);
  }

  updatePet(pet: Pet) {
    return this.crudService.update(pet);
  }

  deletePet(id : string) {
    return this.crudService.delete(id);
  }
}
