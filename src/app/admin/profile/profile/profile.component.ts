import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ImageUpload } from 'app/model/imageUpload';
import { FileService } from 'app/services/utilities/file.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  Data: any;
  UserForm: FormGroup;
  Edicion: boolean;
  Image : ImageUpload;

  constructor(private modelService: UserService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService) {
  }

  ngOnInit() {
    let Id = this.route.snapshot.paramMap.get("id")
    this.UserForm = this._fb.group({
      Uid: [''],
      Username: ['', Validators.required],
      FullName: ['', Validators.required],
      FullLastName: ['', Validators.required],
      Birthday: ['', Validators.required],
      Date: [''],
      ProfileImage: ['']
    });

    if (Id !== null) {
      this.modelService.getUser(Id).subscribe(info => {

        if (info !== undefined)
        {
          this.UserForm.controls['Uid'].setValue(info.Uid)
          this.UserForm.controls['Username'].setValue(info.Username)
          this.UserForm.controls['FullName'].setValue(info.FullName)
          this.UserForm.controls['FullLastName'].setValue(info.FullLastName)
          this.UserForm.controls['Birthday'].setValue(info.Birthday)
          this.UserForm.controls['Date'].setValue(info.Date)
          this.UserForm.controls['ProfileImage'].setValue(info.ProfileImage)
          this.UserForm.addControl('id', new FormControl(info.id))
          this.Image = new ImageUpload(info.ProfileImage);
        } else 
        {
          this.router.navigateByUrl('admin')
        }
      })
    } else {
      alert('Hubo un error al cargar la información de perfil de usuario')
    }
  }

  disabledButton : boolean = false;
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


  File : any;
  FileName : string;
  FileUploadEvent(event) {
    let file = event.target.files[0];
    if (file)
    {
      this.File = file
      this.FileName = file.name;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.Image.Image = file;
        this.Image.ItsNew = true;
        this.Image.Url = event.target.result;
      }
    }
  }

  GuidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
