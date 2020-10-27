import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modelService: PostService) { }

  article: Post;

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.modelService.getPost(Id).subscribe((response) => {
      this.article = response
    });
  }

}
