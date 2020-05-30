import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from 'app/services/post.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Alert } from 'app/model/alert';
import { ImageUpload } from 'app/model/imageUpload';
import { FileService } from 'app/services/utilities/file.service';
import { Post } from 'app/model/post';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-alert-editor',
  templateUrl: './alert-editor.component.html',
  styleUrls: ['./alert-editor.component.scss']
})
export class AlertEditorComponent implements OnInit {

  Data: any;
  Edicion: boolean;
  Images : ImageUpload[] = [];

  constructor(private modelService:PostService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fileService : FileService,
    private authService: AuthService) {
    }

  AlertForm = this._fb.group({
    Uid: [''],
    Title: ['', Validators.required],
    Content: ['', Validators.required],
    Date: [''],
    Type: ['Alerta'],
    Images: [''],
    IdAuthor: ['']
  });

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    let user = await this.authService.getUser();

    this.AlertForm.controls['IdAuthor'].setValue(user.id)

    if (Id !== null)
    {
      this.Edicion = true;
      this.modelService.getPost(Id).subscribe(info => {
        if (info !== undefined)
        {
          this.AlertForm.controls['Uid'].setValue(info.Uid)
          this.AlertForm.controls['Title'].setValue(info.Title)
          this.AlertForm.controls['Content'].setValue(info.Content)
          this.AlertForm.controls['Date'].setValue(info.Date)
          this.AlertForm.controls['Images'].setValue(info.Images)
          this.AlertForm.addControl('id', new FormControl(info.id))
          info.Images.forEach(i => { this.Images.push(new ImageUpload(i)) })
        } else
        {
          this.router.navigateByUrl('admin/alertas')
        }
      }, error => {
        alert('Hubo un error al intentar obtener la alerta')
      });
    } else 
    {
      this.Edicion = false;
    }
  }

  disabledButton : boolean = false;
  async Save() {
    this.disabledButton = true;
    this.AlertForm.controls['Date'].setValue(new Date());

    if (this.Edicion == true)
    {
      var Uid = this.AlertForm.get("Uid").value;
      await this.UploadImages(this.Images, Uid);
      this.modelService.updatePost(this.AlertForm.value as Post).then(success => {
        alert('alerta actualizada!')
        this.router.navigateByUrl('admin/alertas')
      }, error => {
        alert('Hubo un error al actualizar la alerta')
      })
      
    } else 
    {
      var uuid = this.GuidGenerate();
      this.AlertForm.controls['Uid'].setValue(uuid)
      await this.UploadImages(this.Images, uuid);
      this.modelService.createPost(this.AlertForm.value as Post).then(success => {
        alert('alerta creada!')
      this.router.navigateByUrl('admin/alertas')
      }, error => {
        alert('Hubo un error al crear la alerta')
      })
    }
  }

  Delete() {
    var id = this.AlertForm.get('id').value;
    this.modelService.deletePost(id).then(success => {
      alert('alerta eliminada!')
      this.router.navigateByUrl('admin/alertas')
    }, error => {
      alert('Hubo un error al eliminar la alerta')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/alertas')
    }
  }

  async UploadImages(Images : ImageUpload[], Uid : string) {
    if (this.Edicion == true)
    {
      var oldImages = this.Images.filter(x => x.ItsNew == false)
      var newImages = this.Images.filter(x => x.ItsNew == true)
      var urlImages = await this.fileService.UploadFiles(newImages, Uid, 'Alert');
      oldImages.forEach(i => { urlImages.push(i.Url) })
      this.AlertForm.controls['Images'].setValue(urlImages)
    } else 
    {
      var urlImages = await this.fileService.UploadFiles(this.Images, Uid, 'Alert');
      this.AlertForm.controls['Images'].setValue(urlImages)
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
