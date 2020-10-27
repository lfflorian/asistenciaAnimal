import { Component, OnInit } from '@angular/core';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.scss']
})
export class ConsultListComponent implements OnInit {

  constructor(private modelService: PostService) { }
  consults : Post[];

  ngOnInit() {
    this.modelService.getPostsByType('ConsultaGeneral').then(c => {
      this.consults = c;    
    });
  }

}
