import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageUpload } from 'app/model/imageUpload';
import { Pet } from 'app/model/pet';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent implements OnInit {

  @Input() pet: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  selected(i : any) {
    this.router.navigateByUrl(i);
  }
}
