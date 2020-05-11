import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'app/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  Data: any;
  constructor(private modelService:ArticleService,
              private router: Router) { }

  ngOnInit() {
    this.modelService.getArticles().subscribe(articles => {
      this.Data = articles.map(article => 
        Object.assign({}, {Titulo: article.Title,
          Fecha: article.Date,
          link: this.router.createUrlTree(['admin','edicion-articulo', article.id]).toString() }))
    }, error => {
      alert('Hubo un error en la comunicación con el servido')
    });
  }

}
