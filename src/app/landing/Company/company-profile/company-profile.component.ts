import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'app/model/company';
import { Message, PrivateConsultation } from 'app/model/privateConsultation';
import { User } from 'app/model/user';
import { CompanyService } from 'app/services/company.service';
import { PrivateConsultationService } from 'app/services/private-consultation.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService,
              private authService: AuthService,
              private consultationService: PrivateConsultationService) { }

  company : Company;
  consult : PrivateConsultation;
  Message : FormControl = new FormControl();

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.company = await this.companyService.getCompany(Id).pipe(take(1)).toPromise();
  }

  async contactToCopmany() {
    debugger
    let user: User;
    try {
      user = await this.authService.getUser();
    } catch (error) {
      user = undefined;
      alert("Debes iniciar sessión para enviar un mensaje")
      return;
    }


    let message : Message;
    message = { 
      idUser : user.id,
      Date : new Date(),
      Images : null,
      Content : this.Message.value
    }

    this.consult = {
      Date : new Date(),
      CompanyName : this.company.Name,
      IdHost: this.company.id,
      UserName: user.FullName,
      idInvited: user.id,
      Messages: [message]
    }
    
    this.consultationService.createPrivateConsultation(this.consult).then((response) => {
      alert("Mensaje creado exitosamente")
      //this.router.navigateByUrl(`admin/consulta/${this.company.id}`)
    })
  }
}
