import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';
import { CompanyType } from 'app/model/CompanyType';

@Injectable({
  providedIn: 'root'
})
export class CompanyTypeService {

  Model : string = "TipoEmpresa";
  private crudService: FirestoreCrudService<CompanyType>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<CompanyType>(afs, this.Model);
  }

  getCompanyTypes() {
    return this.crudService.list();
  }
}
