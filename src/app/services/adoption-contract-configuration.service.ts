import { Injectable } from '@angular/core';
import { AdoptionContractConfiguration } from 'app/model/adoptionContractConfiguration';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class AdoptionContractConfigurationService {

  Model : string = "ConfiguracionContratoAdopcion";
  private crudService: FirestoreCrudService<AdoptionContractConfiguration>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<AdoptionContractConfiguration>(afs, this.Model);
  }

  createAdoptionContractConfiguration(adoptionContractConfiguration: AdoptionContractConfiguration) {
    return this.crudService.add(adoptionContractConfiguration);
  }

  getAdoptionContractConfigurations() {
    return this.crudService.list();
  }

  getAdoptionContractConfiguration(id : string) {
    return this.crudService.get(id);
  }

  updateAdoptionContractConfiguration(adoptionContractConfiguration: AdoptionContractConfiguration) {
    return this.crudService.update(adoptionContractConfiguration);
  }

  deleteAdoptionContractConfiguration(id : string) {
    return this.crudService.delete(id);
  }
}
