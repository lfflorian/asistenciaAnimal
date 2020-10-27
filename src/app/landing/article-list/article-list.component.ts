import { Component, OnInit } from '@angular/core';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private modelService: PostService) { }
  articles : Post[];

  ngOnInit() {
    this.modelService.getPostsByType('Articulo').then(a => {
      this.articles = a;    
    });
  }
}
