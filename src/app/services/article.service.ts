import { Injectable } from '@angular/core';
import { Article } from 'app/model/article';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  Model : string = "Articulo";
  private crudService: FirestoreCrudService<Article>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<Article>(afs, this.Model);
  }

  createArticle(article: Article) {
    return this.crudService.add(article);
  }

  getArticles() {
    return this.crudService.list();
  }

  getArticle(id : string) {
    return this.crudService.get(id);
  }

  updateArticle(article: Article) {
    return this.crudService.update(article);
  }

  deleteArticle(id : string) {
    return this.crudService.delete(id);
  }
}
