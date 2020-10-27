import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-consult-view',
  templateUrl: './consult-view.component.html',
  styleUrls: ['./consult-view.component.scss']
})
export class ConsultViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modelService: PostService) { }

  consult: Post;

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.modelService.getPost(Id).subscribe((response) => {
      this.consult = response
    });
  }

}
