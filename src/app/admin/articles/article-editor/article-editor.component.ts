import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Image } from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import { ArticleService } from 'app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'app/model/article';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  @ViewChild('content', { static: true }) someInput: ElementRef;

  Data: any;
  ArticleForm: FormGroup;
  Edicion: boolean;

  constructor(private articleService:ArticleService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.ArticleForm = this._fb.group({
      Title : ['', Validators.required],
      Content : ['', Validators.required],
      IdAuthor : ['', Validators.required],
      Date : ['']
    });

    if (Id !== null)
    {
      this.Edicion = true;
      var owner  = this.articleService.getArticle(Id).subscribe(info => {
        if (info !== undefined)
        {
          this.ArticleForm.controls['Title'].setValue(info.Title)
          this.ArticleForm.controls['Content'].setValue(info.Content)
          this.ArticleForm.controls['IdAuthor'].setValue(info.IdAuthor)
          this.ArticleForm.controls['Date'].setValue(info.Date)
          this.ArticleForm.addControl('id', new FormControl(info.id))
        } else
        {
          this.router.navigateByUrl('admin/propietarios')
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

    if (this.Edicion == true)
    {
      this.articleService.updateArticle(this.ArticleForm.value as Article).then(success => {
        alert('articulo actualizado!')
        this.router.navigateByUrl('admin/edicion-articulo')
      }, error => {
        alert('Hubo un error al actualizar el articulo')
      })
      
    } else 
    {
      this.articleService.createArticle(this.ArticleForm.value as Article).then(success => {
        alert('articulo creado!')
      this.router.navigateByUrl('admin/edicion-articulo')
      }, error => {
        alert('Hubo un error al crear el articulo')
      })
    }
  }

  Delete() {
    var id = this.ArticleForm.get('id').value;
    this.articleService.deleteArticle(id).then(success => {
      alert('articulo eliminado!')
      this.router.navigateByUrl('admin/edicion-articulo')
    }, error => {
      alert('Hubo un error al eliminar el articulo')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/edicion-articulo')
    }
  }

  ////////////////// this.someInput.nativeElement.innerHTML
  TextEdition : string;
  public onChange( { editor }: ChangeEvent ) {
    this.TextEdition = editor.getData();
  }
}
