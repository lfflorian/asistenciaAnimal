import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ImageUpload } from 'app/model/imageUpload';
import { FileService } from 'app/services/utilities/file.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/model/user';
import { AuthService } from 'app/services/utilities/auth.service';
import { CompanyService } from 'app/services/company.service';
import { take } from 'rxjs/Operators';
import { Company } from 'app/model/company';
import { CompanyTypeService } from 'app/services/company-type.service';
import { CompanyType } from 'app/model/CompanyType';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private modelService: UserService,
    private companyTypeServices: CompanyTypeService,
    private companyService: CompanyService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private authService: AuthService) {
  }

  Data: any;
  ShowCompany : boolean = false;
  user: User;
  company: Company;
  Edicion: boolean;
  ProfileImage: ImageUpload;
  LogoCompanyImage: ImageUpload;
  RoleEnum: CompanyType[];
  
  UserForm: FormGroup = this._fb.group({
      Email: ['', Validators.required],
      FullName: ['', Validators.required],
      FullLastName: ['', Validators.required],
      Birthday: ['', Validators.required],
      Phone: ['', Validators.required]
  });

  CompanyForm: FormGroup = this._fb.group({
    Id_creator_user: [''],
    Name: ['', Validators.required],
    Description: ['', Validators.required],
    DateIgnauration: ['', Validators.required],
    AsociationType: ['', Validators.required],
  })

  async ngOnInit() {
    this.RoleEnum = await this.companyTypeServices.getCompanyTypes().pipe(take(1)).toPromise();
    this.user = await this.authService.getUser();
    if (this.user !== null) {
      this.UserForm.controls['FullName'].setValue(this.user.FullName)
      this.UserForm.controls['FullLastName'].setValue(this.user.FullLastName)
      this.UserForm.controls['Birthday'].setValue(this.user.Birthday)
      this.UserForm.controls['Phone'].setValue(this.user.Phone)

      this.ProfileImage = new ImageUpload(this.user.ProfileImage);
      this.ProfileImage.Url = this.user.ProfileImage;
      this.ProfileImage.ItsNew = false;

      if (this.user.Company) {
        this.ShowCompany = true;
        this.company = await this.companyService.getCompany(this.user.Id_company).pipe(take(1)).toPromise();

        this.CompanyForm.controls['Name'].setValue(this.company.Name)
        this.CompanyForm.controls['Description'].setValue(this.company.Description)
        this.CompanyForm.controls['DateIgnauration'].setValue(this.company.DateIgnauration)
        this.CompanyForm.controls['AsociationType'].setValue(this.company.AsociationType)

        this.LogoCompanyImage = new ImageUpload(this.company.Logo);
        this.LogoCompanyImage.Url = this.company.Logo;
        this.LogoCompanyImage.ItsNew = false;
      }
    } else {
      alert('Hubo un error al cargar la información de perfil de usuario')
    }
  }

  async save() {
    if (!this.UserForm.valid) {
      alert('Debes llenar todos los campos con sus vaolres correctos')
      return
    }

    if (this.ProfileImage.ItsNew)
    { this.user.ProfileImage = await this.UploadImage(this.ProfileImage, 'Profile'); }

    this.user.FullName = this.UserForm.get("FullName").value;
    this.user.FullLastName = this.UserForm.get("FullLastName").value;
    this.user.Birthday = this.UserForm.get("Birthday").value;
    this.user.Phone = this.UserForm.get("Phone").value;
    
    this.modelService.updateUser(this.user).then(success => {
      alert('usuario actualizado!')
      this.router.navigateByUrl('admin')
    }, error => {
      alert('Hubo un error al actualizar os datos de perfil')
    })
  }

  async saveCompany() {
    if (!this.CompanyForm.valid) {
      alert('Debes llenar todos los campos requeridos con sus vaolres correctos')
      return
    }

    if (this.LogoCompanyImage.ItsNew)
    { this.company.Logo = await this.UploadImage(this.LogoCompanyImage, 'Logo'); }

    this.company.Name = this.CompanyForm.get("Name").value;
    this.company.Description = this.CompanyForm.get("Description").value;
    this.company.DateIgnauration = this.CompanyForm.get("DateIgnauration").value;
    this.company.AsociationType = this.CompanyForm.get('AsociationType').value;
    
    this.companyService.updateCompany(this.company).then(success => {
      alert('empresa actualizada!')
      this.router.navigateByUrl('admin')
    }, error => {
      console.log(error)
      alert('Hubo un error al actualizar os datos de la empresa')
    })
  }

  async UploadImage(image: ImageUpload, path) {
    return await this.fileService.UploadFile(image.Image,path);
  }

  GetProfileImage(image : ImageUpload) {
    this.ProfileImage = image;
  }

  GetLogoImage(image : ImageUpload) {
    this.LogoCompanyImage = image;
  }

  goToCreateCompany() {
    this.router.navigateByUrl('form/formulario-empresa')
  }
}
