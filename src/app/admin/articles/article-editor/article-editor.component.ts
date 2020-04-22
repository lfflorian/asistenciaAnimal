import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { Image } from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  @ViewChild('content', { static: true }) someInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  TextEdition : string;

  public onChange( { editor }: ChangeEvent ) {
    this.TextEdition = editor.getData();
  }

  Guardar() {
    this.someInput.nativeElement.innerHTML = this.TextEdition;
  }
}
