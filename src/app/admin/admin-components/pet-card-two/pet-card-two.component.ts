import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'app/model/pet';

@Component({
  selector: 'app-pet-card-two',
  templateUrl: './pet-card-two.component.html',
  styleUrls: ['./pet-card-two.component.scss']
})
export class PetCardTwoComponent implements OnInit {

  @Input() pet: Pet;
  constructor() { }

  ngOnInit() {
  }

  // selected(i : any) {
  //   this.router.navigateByUrl(i);
  // }
}
