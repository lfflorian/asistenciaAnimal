import { Injectable } from '@angular/core';
import { GeneralConsultation } from 'app/model/generalConsultation';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class generalConsultationService {

  Model : string = "ConsultaGeneral";
  private crudService: FirestoreCrudService<GeneralConsultation>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<GeneralConsultation>(afs, this.Model);
  }

  createGeneralConsultation(generalConsultation: GeneralConsultation) {
    return this.crudService.add(generalConsultation);
  }

  getGeneralConsultations() {
    return this.crudService.list();
  }

  getGeneralConsultation(id : string) {
    return this.crudService.get(id);
  }

  updateGeneralConsultation(generalConsultation: GeneralConsultation) {
    return this.crudService.update(generalConsultation);
  }

  deleteGeneralConsultation(id : string) {
    return this.crudService.delete(id);
  }
}
