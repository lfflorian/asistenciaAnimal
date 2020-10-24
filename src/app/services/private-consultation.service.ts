import { Injectable } from '@angular/core';
import { PrivateConsultation } from 'app/model/privateConsultation';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class PrivateConsultationService {

  Model : string = "ConsultaPrivada";
  private crudService: FirestoreCrudService<PrivateConsultation>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<PrivateConsultation>(afs, this.Model);
  }

  createPrivateConsultation(privateConsultation: PrivateConsultation) {
    return this.crudService.add(privateConsultation);
  }

  getPrivateConsultations() {
    return this.crudService.list();
  }

  getPrivateConsultation(id : string) {
    return this.crudService.get(id);
  }

  getConsultationsByCompany(id : string) {
    return this.crudService.listByReference(id,'IdHost');
  }

  getConsultationsByUser(id : string) {
    return this.crudService.listByReference(id,'idInvited');
  }

  updatePrivateConsultation(privateConsultation: PrivateConsultation) {
    return this.crudService.update(privateConsultation);
  }

  deletePrivateConsultation(id : string) {
    return this.crudService.delete(id);
  }
}
