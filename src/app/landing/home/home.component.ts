import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'app/model/contact';
import { PayMent } from 'app/model/PayMent';
import { ContactService } from 'app/services/contact.service';
import { PayMentService } from 'app/services/pay-ment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private fb: FormBuilder,
              private contactService: ContactService,
              private payMentService: PayMentService) { }
  paymentSelection : boolean;
  comfirmPayment: boolean;

  PayMentForm = this.fb.group({
    Email: ['',[Validators.required, Validators.email]],
    Phone: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    Name: ['',[Validators.required]]
  })

  ContactForm = this.fb.group({
    Name: ['',[Validators.required]],
    Email: ['',[Validators.required, Validators.email]],
    Description: ['',[Validators.required]],
  })

  ngOnInit() {
  }

  GoTo(url : string) {
    this.router.navigateByUrl(url)
  }

  paymentSelectionEvent() {
    this.paymentSelection = true;
  }

  comfirmPaymentEvnt() {
    if (!this.PayMentForm.valid) {
      alert("Debes completar todos los campos y verifica que el email sea un correo valido")
      return
    }

    var payment = this.PayMentForm.value as PayMent;
    payment.Date = new Date();
    this.payMentService.createPago(payment).then(response => {
      this.comfirmPayment = true;
      this.paymentSelection = false;
      this.PayMentForm.reset()
    })
  }

  contactUs() {
    if (!this.ContactForm.valid) {
      alert("Debes completar todos los campos y verifica que el email sea un correo valido")
      return
    }

    var contact = this.ContactForm.value as Contact;
    contact.Date = new Date();
    this.contactService.createContact(contact).then(response => {
        alert("Gracias por contactarnos! pronto te estaremos respondiendo")
        this.comfirmPayment = false;
        this.ContactForm.reset()
    })
  }
}
