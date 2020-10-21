import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PetService } from 'app/services/pet.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Pet } from 'app/model/pet';
import { ImageUpload } from 'app/model/imageUpload';
import { FileService } from 'app/services/utilities/file.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-pet-editor',
  templateUrl: './pet-editor.component.html',
  styleUrls: ['./pet-editor.component.scss']
})
export class PetEditorComponent implements OnInit {

  constructor(private petService:PetService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fileService : FileService,
    private authService: AuthService) {
    }

  Data: any;
  Edicion: boolean;
  Images : ImageUpload[] = [];
  InAdoptionEnable : boolean = false;
  user : User;
  pet : Pet;

  

  PetForm = this._fb.group({
    Name: ['', Validators.required],
    Age: ['', Validators.required],
    Race: [''],
    Height: [''],
    Weight: [''],
    Color: [''],
    MoreAbout : [''],
    InAdoption : [false],
    Gender : ['']
  });

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.user = await this.authService.getUser();

    this.InAdoptionEnable = (this.user.Rol == "empresa");

    if (Id !== null)
    {
      this.Edicion = true;
      this.petService.getPet(Id).subscribe(info => {
        if (info !== undefined)
        {
          this.pet = info
          this.PetForm.controls['Name'].setValue(info.Name)
          this.PetForm.controls['Age'].setValue(info.Age)
          this.PetForm.controls['Race'].setValue(info.Race)
          this.PetForm.controls['Height'].setValue(info.Height)
          this.PetForm.controls['Weight'].setValue(info.Weight)
          this.PetForm.controls['Color'].setValue(info.Color)
          this.PetForm.controls['MoreAbout'].setValue(info.MoreAbout)
          this.PetForm.controls['InAdoption'].setValue(info.InAdoption)
          this.PetForm.controls['Gender'].setValue(info.Gender)
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
      this.pet = {}
      this.Edicion = false;
    }
  }

  async Save() {
    this.pet.Name = this.PetForm.get("Name").value;
    this.pet.Age = this.PetForm.get("Age").value;
    this.pet.Race = this.PetForm.get("Race").value;
    this.pet.Height = this.PetForm.get("Height").value;
    this.pet.Weight = this.PetForm.get("Weight").value;
    this.pet.Color = this.PetForm.get("Color").value;
    this.pet.MoreAbout = this.PetForm.get("MoreAbout").value;
    this.pet.InAdoption = this.PetForm.get("InAdoption").value;
    this.pet.Gender = this.PetForm.get("Gender").value;

    if (this.Edicion == true)
    {
      await this.UploadImages(this.Images, this.pet.id);
      this.petService.updatePet(this.pet).then(success => {
        alert('mascota actualizada!')
        this.router.navigateByUrl('admin/mascotas')
      }, error => {
        alert('Hubo un error al actualizar la mascota')
      })
      
    } else 
    {
      var uuid = this.GuidGenerate();
      this.pet.IdUser = this.user.id
      this.pet.Date = new Date();

      await this.UploadImages(this.Images, uuid);
      this.petService.createPet(this.pet).then(success => {
        alert('mascota creada!')
      this.router.navigateByUrl('admin/mascotas')
      }, error => {
        alert('Hubo un error al crear la mascota')
      })
    }
  }

  Delete() {
    this.petService.deletePet(this.pet.id).then(success => {
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
      this.pet.Images = urlImages
    } else 
    {
      var urlImages = await this.fileService.UploadFiles(this.Images, Uid, 'Alert');
      this.pet.Images = urlImages
    }
  }

  GetImages(images : ImageUpload[]) {
    this.Images = images;
  }

  GuidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
