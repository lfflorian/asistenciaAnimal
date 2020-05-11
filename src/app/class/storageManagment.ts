import { AngularFireStorage } from '@angular/fire/storage';

export class StorageManagment {
    
    constructor(private afs: AngularFireStorage) {
    }

    async UploadFile(reference : string, image : any) {
        return await this.afs.ref(reference).put(image);
    }

    async GetURL(reference : string) {
        return await this.afs.ref(reference).getDownloadURL().toPromise();
    }
}