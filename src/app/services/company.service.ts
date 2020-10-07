import { Injectable } from '@angular/core';
import { Company } from 'app/model/company';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  Model : string = "Empresa";
  private crudService: FirestoreCrudService<Company>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Company>(afs, this.Model);
  }

  createCompany(Company: Company) {
    return this.crudService.add(Company);
  }

  getCompanys() {
    return this.crudService.list();
  }

  getCompany(id : string) {
    return this.crudService.get(id);
  }

  updateCompany(Company: Company) {
    return this.crudService.update(Company);
  }

  deleteCompany(id : string) {
    return this.crudService.delete(id);
  }
}
