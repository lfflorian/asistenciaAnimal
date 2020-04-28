import { Injectable } from '@angular/core';
import { AdoptionRequestConfiguration } from 'app/model/adoptionRequestConfiguration';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestConfigurationService {

  Model : string = "ConfiguracionSolicitudAdopcion";
  private crudService: FirestoreCrudService<AdoptionRequestConfiguration>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<AdoptionRequestConfiguration>(afs, this.Model);
  }

  createAdoptionRequestConfiguration(adoptionRequestConfiguration: AdoptionRequestConfiguration) {
    return this.crudService.add(adoptionRequestConfiguration);
  }

  getAdoptionRequestConfigurations() {
    return this.crudService.list();
  }

  getAdoptionRequestConfiguration(id : string) {
    return this.crudService.get(id);
  }

  updateAdoptionRequestConfiguration(adoptionRequestConfiguration: AdoptionRequestConfiguration) {
    return this.crudService.update(adoptionRequestConfiguration);
  }

  deleteAdoptionRequestConfiguration(id : string) {
    return this.crudService.delete(id);
  }
}
