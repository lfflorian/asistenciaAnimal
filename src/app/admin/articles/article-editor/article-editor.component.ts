import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { PostService } from 'app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'app/model/post';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  @ViewChild('content', { static: true }) someInput: ElementRef;

  Data: string;
  Edicion: boolean;

  constructor(private modelService:PostService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ArticleForm = this._fb.group({
    Title: ['', Validators.required],
    Content: ['', Validators.required],
    IdAuthor: ['', Validators.required],
    Type: ['Articulo'],
    Date: ['']
  });

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    let user = await this.authService.getUser();

    this.ArticleForm.controls['IdAuthor'].setValue(user.id)

    if (Id !== null)
    {
      this.Edicion = true;
      var owner  = this.modelService.getPost(Id).subscribe(info => {
        if (info !== undefined)
        {
          this.ArticleForm.controls['Title'].setValue(info.Title)
          this.ArticleForm.controls['Content'].setValue(info.Content)
          this.ArticleForm.controls['IdAuthor'].setValue(info.IdAuthor)
          this.ArticleForm.controls['Date'].setValue(info.Date)
          this.ArticleForm.addControl('id', new FormControl(info.id))
          console.log(info.Content)
          this.Data = info.Content;
        } else
        {
          this.router.navigateByUrl('admin/articulos')
        }
      }, error => {
        alert('Hubo un error al intentar obtener el articulo')
      });
    } else 
    {
      this.Edicion = false;
    }
  }

  Save() {
    this.ArticleForm.controls['Content'].setValue(this.TextEdition);
    this.ArticleForm.controls['Date'].setValue(new Date());

    if (!this.ArticleForm.valid) {
      alert("Debes llenar los campos requeridos")
      return
    }

    if (this.Edicion == true)
    {
      this.modelService.updatePost(this.ArticleForm.value as Post).then(success => {
        alert('articulo actualizado!')
        this.router.navigateByUrl('admin/articulos')
      }, error => {
        alert('Hubo un error al actualizar el articulo')
      })
      
    } else 
    {
      this.modelService.createPost(this.ArticleForm.value as Post).then(success => {
        alert('articulo creado!')
      this.router.navigateByUrl('admin/articulos')
      }, error => {
        alert('Hubo un error al crear el articulo')
      })
    }
  }

  Delete() {
    var id = this.ArticleForm.get('id').value;
    this.modelService.deletePost(id).then(success => {
      alert('articulo eliminado!')
      this.router.navigateByUrl('admin/articulos')
    }, error => {
      alert('Hubo un error al eliminar el articulo')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/articulos')
    }
  }

  ////////////////// this.someInput.nativeElement.innerHTML
  TextEdition : string;
  public onChange( { editor }: ChangeEvent ) {
    this.TextEdition = editor.getData();
  }
}
