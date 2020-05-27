import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ImageUpload } from 'app/model/imageUpload';
import { FileService } from 'app/services/utilities/file.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/model/user';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  Data: any;
  UserForm: FormGroup = this._fb.group({
    Uid: [''],
      Email: ['', Validators.required],
      FullName: ['', Validators.required],
      FullLastName: ['', Validators.required],
      Birthday: ['', Validators.required],
      Date: [''],
      ProfileImage: ['']
  });
  Edicion: boolean;
  Image: ImageUpload;

  constructor(private modelService: UserService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    var user = await this.authService.getUser();
    if (user !== null) {
      this.UserForm.controls['Uid'].setValue(user.Uid)
      this.UserForm.controls['Email'].setValue(user.Email)
      this.UserForm.controls['FullName'].setValue(user.FullName)
      this.UserForm.controls['FullLastName'].setValue(user.FullLastName)
      this.UserForm.controls['Birthday'].setValue(user.Birthday)
      this.UserForm.controls['Date'].setValue(user.Date)
      this.UserForm.controls['ProfileImage'].setValue(user.ProfileImage)
      this.UserForm.addControl('id', new FormControl(user.id))
      this.Image = new ImageUpload(user.ProfileImage);
      this.Image.Url = user.ProfileImage;
    } else {
      alert('Hubo un error al cargar la información de perfil de usuario')
    }
  }

  disabledButton: boolean = false;
  async save() {
    this.disabledButton = true;
    this.UserForm.controls['Date'].setValue(new Date());

    var Uid = this.UserForm.get("Uid").value;
    await this.UploadImage();
    this.modelService.updateUser(this.UserForm.value as User).then(success => {
      alert('usuario actualizado!')
      this.router.navigateByUrl('admin')
    }, error => {
      alert('Hubo un error al actualizar os datos de perfil')
    })
  }

  async UploadImage() {
    var urlImage = await this.fileService.UploadFile(this.Image.Image, 'Profile');
    this.UserForm.controls['ProfileImage'].setValue(urlImage);
  }


  File: any;
  FileName: string;
  FileUploadEvent(event) {
    let file = event.target.files[0];
    if (file) {
      this.File = file
      this.FileName = file.name;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(event)
        this.Image.Image = file;
        this.Image.ItsNew = true;
        this.Image.Url = event.target.result;
      }

      reader.readAsDataURL(file)
    }
  }

  GuidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
