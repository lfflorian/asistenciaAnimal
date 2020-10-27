import { Component, OnInit } from '@angular/core';
import { Post } from 'app/model/post';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit {

  constructor(private modelService: PostService) { }
  alerts : Post[];

  ngOnInit() {
    this.modelService.getPostsByType('Alerta').then(a => {
      this.alerts = a;    
    });
  }

}
