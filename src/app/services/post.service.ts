import { Injectable } from '@angular/core';
import { Post } from 'app/model/post';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  Model : string = "Publicacion";
  private crudService: FirestoreCrudService<Post>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Post>(afs, this.Model);
  }

  createPost(post: Post) {
    return this.crudService.add(post);
  }

  getPostsByType(type : string) {
    return this.crudService.listByReference(type, 'Type');
  }

  getPostsByTypeAndAuth(type : string, id : string) {
    return this.crudService.listByReferenceAndUser(type, 'Type', id, 'IdAuthor');
  }

  getPosts() {
    return this.crudService.list();
  }

  getPost(id : string) {
    return this.crudService.get(id);
  }

  updatePost(post: Post) {
    return this.crudService.update(post);
  }

  deletePost(id : string) {
    return this.crudService.delete(id);
  }
}
