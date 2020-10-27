import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrls: ['./alert-view.component.scss']
})
export class AlertViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modelService: PostService) { }

  alert: Post;

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.modelService.getPost(Id).subscribe((response) => {
      this.alert = response
    });
  }

}
