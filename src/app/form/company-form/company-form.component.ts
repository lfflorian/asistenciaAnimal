import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'app/model/company';
import { CompanyType } from 'app/model/CompanyType';
import { User } from 'app/model/user';
import { CompanyTypeService } from 'app/services/company-type.service';
import { CompanyService } from 'app/services/company.service';
import { PackageService } from 'app/services/package.service';
import { RolService } from 'app/services/rol.service';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  RoleEnum: CompanyType[];

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private companyService: CompanyService,
              private userService: UserService,
              private rolService: RolService,
              private companyTypeServices: CompanyTypeService,
              private packageService: PackageService,
              private router: Router) { }

  user: User;

  CompanyForm = this.fb.group({
    Id_creator_user: [''],
    Name: [''],
    Description: [''],
    DateIgnauration: [''],
    AsociationType: [''],
    Date: [''],
    Package: ['']
    // Logo: ['']
  })

  async ngOnInit() {
    this.RoleEnum = await this.companyTypeServices.getCompanyTypes().pipe(take(1)).toPromise();
    this.user = await this.authService.getUser();
  }

  async save() {
    var packages = await this.packageService.getPackages().pipe(take(1)).toPromise();
    var rols = await this.rolService.getRols().pipe(take(1)).toPromise();

    this.CompanyForm.controls['Date'].setValue(new Date());
    this.CompanyForm.controls['Id_creator_user'].setValue(this.user.id);

    var company = this.CompanyForm.value as Company
    company.Package = packages.find(p => p.Precio == 0)

    this.companyService.createCompany(company).then(success => {
      debugger
      this.user.Company = true;
      this.user.Id_company = success.id;
      this.user.Rol = rols.find(r => r.Access == 1)

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
