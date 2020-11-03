import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';
import { PayMent } from 'app/model/PayMent';

@Injectable({
  providedIn: 'root'
})
export class PayMentService {

  Model : string = "Pago";
  private crudService: FirestoreCrudService<PayMent>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<PayMent>(afs, this.Model);
  }

  createPago(payment: PayMent) {
    return this.crudService.add(payment);
  }
}
