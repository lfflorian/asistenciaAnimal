import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  Data: any;
  constructor(private modelService:PostService,
              private router: Router,
              private authService: AuthService) { }

  async ngOnInit() {
    let user = await this.authService.getUser();
    this.modelService.getPostsByTypeAndAuth('Articulo', user.id).then((articles) => {
      this.Data = articles.map(article => 
        Object.assign({}, {Titulo: article.Title,
          Fecha: article.Date,
          link: this.router.createUrlTree(['admin','edicion-articulo', article.id]).toString() }))
    }, (error) => {
      alert('Hubo un error en la comunicación con el servido')
    })
  }

}
