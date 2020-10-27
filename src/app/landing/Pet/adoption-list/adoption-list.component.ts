import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from 'app/model/pet';
import { PetService } from 'app/services/pet.service';

@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.scss']
})
export class AdoptionListComponent implements OnInit {

  PetsInAdoption : Pet[];
  constructor(private petService: PetService,
              private router: Router) { }

  ngOnInit() {
    this.petService.getPetsForAdoption().then((result) => {
      this.PetsInAdoption = result;
    })
  }

  GoToAdoption(idPet : string) {
    this.router.navigateByUrl('form/formulario-adopcion/'+idPet);
  }
}
