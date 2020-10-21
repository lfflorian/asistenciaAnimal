import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageUpload } from 'app/model/imageUpload';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  @Input() Files: ImageUpload[];
  @Output() ImageEventReturn: EventEmitter<ImageUpload[]> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  FileUploadEvent(event) {
    let images = event.target.files;
    if (images && images[0]) {
      var filesAmount = images.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.Files.push(new ImageUpload(event.target.result, images[i], true))
        }

        reader.readAsDataURL(images[i]);
      }

      this.ImageEventReturn.emit(this.Files)
    }
  }

  deleteImage(index) {
    this.Files.splice(index, 1);
  }
}
