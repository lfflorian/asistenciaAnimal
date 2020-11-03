import { PipeTransform } from '@angular/core';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'app/model/company';
import { User } from 'app/model/user';
import { CompanyService } from 'app/services/company.service';
import { RolService } from 'app/services/rol.service';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'app-information-register',
  templateUrl: './information-register.component.html',
  styleUrls: ['./information-register.component.scss']
})
export class InformationRegisterComponent implements OnInit {

  companyFormEnabled : Boolean = false;
  user : User;

  UserForm = this.fb.group({
    FullName: [''],
    FullLastName: [''],
    Birthday: [''],
    Phone : [''],
    Date: ['']
  })

  CompanyForm = this.fb.group({
    Id_creator_user: [''],
    Name: [''],
    Description: [''],
    DateIgnauration: [''],
    AsociationType: [''],
    Date: ['']
  })

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private rolService: RolService,
    private companyService: CompanyService,
    private router: Router) { }

  RoleEnum: any;
  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.RoleEnum = [];
    console.log(this.user)
  }

  async RegisterInformation() {
    var rols = await this.rolService.getRols().pipe(take(1)).toPromise();
    this.user.Rol = rols.find(r => { r.Access = 0})
    this.UserForm.controls['Date'].setValue(new Date());
    this.user.FullName = this.UserForm.get('FullName').value;
    this.user.FullLastName = this.UserForm.get('FullLastName').value;
    this.user.Birthday = this.UserForm.get('Birthday').value;``
    this.user.Phone = this.UserForm.get('Phone').value;

    if (this.companyFormEnabled) {
      this.CompanyForm.controls['Id_creator_user'].setValue(this.user.id)
      let company : Company;

      try {
        this.CompanyForm.controls['Date'].setValue(new Date());
        company = await this.companyService.createCompany(this.CompanyForm.value as Company)
        this.user.Id_company = company.id;
        this.user.Company = true;
      } catch (error) {
        // Hubo un error con este tema
        return;
      }
    } else {
      this.user.Company = false;
    }

    this.user.FullDataEntry = true;
    
    this.userService.updateUser(this.user).then(success => {
      this.router.navigateByUrl('admin');
    }, error => {
      // Hubo un error con este tema
    })
  }
}