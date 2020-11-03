import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PayMent } from 'app/model/PayMent';
import { PayMentService } from 'app/services/pay-ment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private fb: FormBuilder,
              private payMentService: PayMentService) { }
  paymentSelection : boolean;
  comfirmPayment: boolean;

  PayMentForm = this.fb.group({
    Email: [''],
    Phone: [''],
    Name: ['']
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
    var payment = this.PayMentForm.value as PayMent;
    payment.Date = new Date();
    this.payMentService.createPago(payment).then(response => {
      this.comfirmPayment = true;
    })
    
  }

}
