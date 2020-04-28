import { Injectable } from '@angular/core';
import { Alert } from 'app/model/alert';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  Model : string = "Alerta";
  private crudService: FirestoreCrudService<Alert>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Alert>(afs, this.Model);
  }

  createAlert(alert: Alert) {
    return this.crudService.add(alert);
  }

  getAlerts() {
    return this.crudService.list();
  }

  getAlert(id : string) {
    return this.crudService.get(id);
  }

  updateAlert(alert: Alert) {
    return this.crudService.update(alert);
  }

  deleteAlert(id : string) {
    return this.crudService.delete(id);
  }
}
