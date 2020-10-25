import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CopmanyTypes } from 'app/Data/CompanyTypes';
import { Company } from 'app/model/company';
import { User } from 'app/model/user';
import { CompanyService } from 'app/services/company.service';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  RoleEnum: typeof CopmanyTypes;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private companyService: CompanyService,
              private userService: UserService,
              private router: Router) { }

  user: User;

  CompanyForm = this.fb.group({
    Id_creator_user: [''],
    Name: [''],
    Description: [''],
    DateIgnauration: [''],
    AsociationType: [''],
    Date: [''],
    // Logo: ['']
  })

  async ngOnInit() {
    this.RoleEnum = CopmanyTypes;
    this.user = await this.authService.getUser();
  }

  async save() {
    this.CompanyForm.controls['Date'].setValue(new Date());
    this.CompanyForm.controls['Id_creator_user'].setValue(this.user.id);

    this.companyService.createCompany(this.CompanyForm.value as Company).then(success => {
      this.user.Company = true;
      this.user.Id_company = success.id;

      this.userService.updateUser(this.user).then(success => {
        alert("Empresa creada exitosamente")
        this.router.navigateByUrl('admin')
      })
    }, error => {
      console.log(error)
      alert('Hubo un error al actualizar os datos de la empresa')
    })
  }
}
