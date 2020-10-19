import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PetService } from 'app/services/pet.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Pet } from 'app/model/pet';
import { ImageUpload } from 'app/model/imageUpload';
import { FileService } from 'app/services/utilities/file.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-pet-editor',
  templateUrl: './pet-editor.component.html',
  styleUrls: ['./pet-editor.component.scss']
})
export class PetEditorComponent implements OnInit {

  Data: any;
  Edicion: boolean;
  Images : ImageUpload[] = [];
  InAdoptionEnable : boolean = false;

  constructor(private petService:PetService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fileService : FileService,
    private authService: AuthService) {
    }

  PetForm = this._fb.group({
    IdUser: [''],
    Uid: [''],
    Name: ['', Validators.required],
    Age: ['', Validators.required],
    Race: [''],
    Height: [''],
    Weight: [''],
    Color: [''],
    Date: [''],
    MoreAbout : [''],
    InAdoption : [false],
    Images: ['']
  });

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    let user = await this.authService.getUser();

    this.PetForm.controls['IdUser'].setValue(user.id)
    this.InAdoptionEnable = (user.Rol == "empresa");

    if (Id !== null)
    {
      this.Edicion = true;
      this.petService.getPet(Id).subscribe(info => {
        if (info !== undefined)
        {
          this.PetForm.controls['Uid'].setValue(info.Uid)
          this.PetForm.controls['Name'].setValue(info.Name)
          this.PetForm.controls['Age'].setValue(info.Age)
          this.PetForm.controls['Race'].setValue(info.Race)
          this.PetForm.controls['Height'].setValue(info.Height)
          this.PetForm.controls['Weight'].setValue(info.Weight)
          this.PetForm.controls['Color'].setValue(info.Color)
          this.PetForm.controls['Date'].setValue(info.Date)
          this.PetForm.controls['MoreAbout'].setValue(info.MoreAbout)
          this.PetForm.controls['Images'].setValue(info.Images)
          this.PetForm.controls['InAdoption'].setValue(info.InAdoption)
          this.PetForm.addControl('id', new FormControl(info.id))
          info.Images.forEach(i => { this.Images.push(new ImageUpload(i)) })
        } else
        {
          this.router.navigateByUrl('admin/mascotas')
        }
      }, error => {
        alert('Hubo un error al intentar obtener la mascota')
      });
    } else 
    {
      this.Edicion = false;
    }
  }

  disabledButton : boolean = false;
  async Save() {
    this.disabledButton = true;
    this.PetForm.controls['Date'].setValue(new Date());

    if (this.Edicion == true)
    {
      var Uid = this.PetForm.get("Uid").value;
      await this.UploadImages(this.Images, Uid);
      this.petService.updatePet(this.PetForm.value as Pet).then(success => {
        alert('mascota actualizada!')
        this.router.navigateByUrl('admin/mascotas')
      }, error => {
        alert('Hubo un error al actualizar la mascota')
      })
      
    } else 
    {
      var uuid = this.GuidGenerate();
      this.PetForm.controls['Uid'].setValue(uuid)
      await this.UploadImages(this.Images, uuid);
      this.petService.createPet(this.PetForm.value as Pet).then(success => {
        alert('mascota creada!')
      this.router.navigateByUrl('admin/mascotas')
      }, error => {
        alert('Hubo un error al crear la mascota')
      })
    }
  }

  Delete() {
    var id = this.PetForm.get('id').value;
    this.petService.deletePet(id).then(success => {
      alert('mascota eliminada!')
      this.router.navigateByUrl('admin/mascotas')
    }, error => {
      alert('Hubo un error al eliminar la mascota')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/mascotas')
    }
  }

  async UploadImages(Images : ImageUpload[], Uid : string) {
    if (this.Edicion == true)
    {
      var oldImages = this.Images.filter(x => x.ItsNew == false)
      var newImages = this.Images.filter(x => x.ItsNew == true)
      var urlImages = await this.fileService.UploadFiles(newImages, Uid, 'Alert');
      oldImages.forEach(i => { urlImages.push(i.Url) })
      this.PetForm.controls['Images'].setValue(urlImages)
    } else 
    {
      var urlImages = await this.fileService.UploadFiles(this.Images, Uid, 'Alert');
      this.PetForm.controls['Images'].setValue(urlImages)
    }
  }

  FileUploadEvent(event) {
    let images = event.target.files;
    if (images && images[0]) {
      var filesAmount = images.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.Images.push(new ImageUpload(event.target.result, images[i], true))
        }

        reader.readAsDataURL(images[i]);
      }
    }
  }

  deleteImage(index) {
    this.Images.splice(index, 1);
  }

  GuidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
