import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';
import { Contact } from 'app/model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  Model : string = "Contacto";
  private crudService: FirestoreCrudService<Contact>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Contact>(afs, this.Model);
  }

  createContact(contact: Contact) {
    return this.crudService.add(contact);
  }
}
