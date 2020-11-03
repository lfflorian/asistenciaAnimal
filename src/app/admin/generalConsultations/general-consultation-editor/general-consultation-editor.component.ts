import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from 'app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'app/model/post';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-general-consultation-editor',
  templateUrl: './general-consultation-editor.component.html',
  styleUrls: ['./general-consultation-editor.component.scss']
})
export class GeneralConsultationEditorComponent implements OnInit {

  Data: any;
  Edicion: boolean;

  constructor(private modelService: PostService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ConsultationForm = this._fb.group({
    Title: ['', Validators.required],
    Content: ['', Validators.required],
    Date: [''],
    Type: ['ConsultaGeneral'],
    IdAuthor: ['']
  });

  async ngOnInit() {
    let Id = this.route.snapshot.paramMap.get("id")
    let user = await this.authService.getUser();
    
    this.ConsultationForm.controls['IdAuthor'].setValue(user.id)

    if (Id !== null) {
      this.Edicion = true;
      var owner = this.modelService.getPost(Id).subscribe(info => {
        if (info !== undefined) {
          this.ConsultationForm.controls['Title'].setValue(info.Title)
          this.ConsultationForm.controls['Content'].setValue(info.Content)
          this.ConsultationForm.controls['Date'].setValue(info.Date)
          this.ConsultationForm.addControl('id', new FormControl(info.id))
        } else {
          this.router.navigateByUrl('admin/consultas-generales')
        }
      }, error => {
        alert('Hubo un error al intentar obtener la consulta general')
      });
    } else {
      this.Edicion = false;
    }
  }


  Save() {
    this.ConsultationForm.controls['Date'].setValue(new Date());

    if (!this.ConsultationForm.valid) {
      alert("Debes llenar los campos requeridos")
      return
    }

    if (this.Edicion == true) {
      this.modelService.updatePost(this.ConsultationForm.value as Post).then(success => {
        alert('Consultas General actualizado!')
        this.router.navigateByUrl('admin/consultas-generales')
      }, error => {
        alert('Hubo un error al actualizar el consulta general')
      })

    } else {
      this.modelService.createPost(this.ConsultationForm.value as Post).then(success => {
        alert('Consultas General creado!')
        this.router.navigateByUrl('admin/consultas-generales')
      }, error => {
        alert('Hubo un error al crear el consulta general')
      })
    }
  }

  Delete() {
    var id = this.ConsultationForm.get('id').value;
    this.modelService.deletePost(id).then(success => {
      alert('Consultas General eliminado!')
      this.router.navigateByUrl('admin/consultas-generales')
    }, error => {
      alert('Hubo un error al eliminar el consulta general')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?")) {
      this.router.navigateByUrl('admin/consultas-generales')
    }
  }
}
