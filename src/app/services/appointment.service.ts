import { Injectable } from '@angular/core';
import { Appointment } from 'app/model/appointment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  Model : string = "Cita";
  private crudService: FirestoreCrudService<Appointment>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Appointment>(afs, this.Model);
  }

  createAppointment(appointment: Appointment) {
    return this.crudService.add(appointment);
  }

  getAppointments() {
    return this.crudService.list();
  }

  getAppointment(id : string) {
    return this.crudService.get(id);
  }

  updateAppointment(appointment: Appointment) {
    return this.crudService.update(appointment);
  }

  deleteAppointment(id : string) {
    return this.crudService.delete(id);
  }
}
