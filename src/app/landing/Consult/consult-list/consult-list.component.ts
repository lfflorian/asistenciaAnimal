import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.scss']
})
export class ConsultListComponent implements OnInit {

  constructor(private modelService: PostService,
    private router: Router) { }
  consults : Post[];

  ngOnInit() {
    this.modelService.getPostsByType('ConsultaGeneral').then(c => {
      this.consults = c;    
    });
  }

  GoTo(id : string) {
    this.router.navigateByUrl('page/consulta/' + id)
  }
}
