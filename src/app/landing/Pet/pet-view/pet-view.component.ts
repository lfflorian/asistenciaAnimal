import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'app/model/pet';
import { PetService } from 'app/services/pet.service';

@Component({
  selector: 'app-pet-view',
  templateUrl: './pet-view.component.html',
  styleUrls: ['./pet-view.component.scss']
})
export class PetViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modelService: PetService) { }

  pet : Pet;

  ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.modelService.getPet(Id).subscribe((response) => {
      this.pet = response
    });
  }

}
