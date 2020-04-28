import { Injectable } from '@angular/core';
import { AdoptionRequest } from 'app/model/adoptionRequest';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {

  Model : string = "SolicitudAdopcion";
  private crudService: FirestoreCrudService<AdoptionRequest>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<AdoptionRequest>(afs, this.Model);
  }

  createAdoptionRequest(adoptionRequest: AdoptionRequest) {
    return this.crudService.add(adoptionRequest);
  }

  getAdoptionRequests() {
    return this.crudService.list();
  }

  getAdoptionRequest(id : string) {
    return this.crudService.get(id);
  }

  updateAdoptionRequest(adoptionRequest: AdoptionRequest) {
    return this.crudService.update(adoptionRequest);
  }

  deleteAdoptionRequest(id : string) {
    return this.crudService.delete(id);
  }
}
