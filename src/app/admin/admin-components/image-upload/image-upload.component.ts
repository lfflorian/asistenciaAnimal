import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageUpload } from 'app/model/imageUpload';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() Image: ImageUpload;
  @Input() Title: string;
  @Output() ImageEventReturn: EventEmitter<ImageUpload> = new EventEmitter();
  constructor() { }

  ngOnInit() {
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
        this.Image.Image = file;
        this.Image.ItsNew = true;
        this.Image.Url = event.target.result;
      }
      reader.readAsDataURL(file)
      this.ImageEventReturn.emit(this.Image)
    }
  }
}
