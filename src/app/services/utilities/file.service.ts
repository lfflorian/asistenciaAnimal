import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { StorageManagment } from 'app/class/storageManagment';
import { ImageUpload } from 'app/model/imageUpload';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private FileManagment : StorageManagment;
  constructor(private afs: AngularFireStorage) { 
    this.FileManagment = new StorageManagment(afs);
  }

  async UploadFiles(images : ImageUpload[], Guid : string, model : string) {
    var promises = []; 
    images.forEach(async image => {
      var path = `${model}/${Guid}/${image.Image.name}`;
      promises.push(this.FileManagment.UploadFile(path, image.Image).then(x => {
        return this.FileManagment.GetURL(path);
      }))
    })

    return Promise.all(promises)
  }

  async UploadFile(file : any, model : string) {
    var promises = []; 
    var path = `${model}/${file.name}`;

    await this.FileManagment.UploadFile(path,file)
    return await  this.FileManagment.GetURL(path);
  }
}
