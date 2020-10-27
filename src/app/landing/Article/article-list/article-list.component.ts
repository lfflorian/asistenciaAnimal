import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private modelService: PostService,
    private router: Router) { }
  articles : Post[];

  ngOnInit() {
    this.modelService.getPostsByType('Articulo').then(a => {
      this.articles = a;    
    });
  }

  GoTo(id : string) {
    this.router.navigateByUrl('page/articulo/' + id)
  }
}
