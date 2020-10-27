import { Injectable } from '@angular/core';
import { AdoptionForm } from 'app/model/AdoptionForm';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class AdoptionFormService {

  Model : string = "FormularioAdopcion";
  private crudService: FirestoreCrudService<AdoptionForm>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<AdoptionForm>(afs, this.Model);
  }

  createAdoptionForm(adoptionForm: AdoptionForm) {
    return this.crudService.add(adoptionForm);
  }

  getAdoptionForms(id : string) {
    return this.crudService.listByReference(id, 'IdEmpresa');
  }

  getAdoptionFormsByUSer(id : string) {
    return this.crudService.listByReference(id, 'IdUsuario');
  }

  getAdoptionForm(id : string) {
    return this.crudService.get(id);
  }

  updateAdoptionForm(adoptionForm: AdoptionForm) {
    return this.crudService.update(adoptionForm);
  }

  deleteAdoptionForm(id : string) {
    return this.crudService.delete(id);
  }
}
