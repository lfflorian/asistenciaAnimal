import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit {

  constructor(private modelService: PostService,
    private router: Router) { }
  alerts : Post[];

  ngOnInit() {
    this.modelService.getPostsByType('Alerta').then(a => {
      this.alerts = a;    
    });
  }

  GoTo(id : string) {
    this.router.navigateByUrl('page/alerta/' + id)
  }

}
