import { Injectable } from '@angular/core';
import { AdoptionContract } from 'app/model/adoptionContract';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class AdoptionContractService {

  Model : string = "ContratoAdopcion";
  private crudService: FirestoreCrudService<AdoptionContract>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<AdoptionContract>(afs, this.Model);
  }

  createAdoptionContract(adoptionContract: AdoptionContract) {
    return this.crudService.add(adoptionContract);
  }

  getAdoptionContracts() {
    return this.crudService.list();
  }

  getAdoptionContract(id : string) {
    return this.crudService.get(id);
  }

  updateAdoptionContract(adoptionContract: AdoptionContract) {
    return this.crudService.update(adoptionContract);
  }

  deleteAdoptionContract(id : string) {
    return this.crudService.delete(id);
  }
}
