import { Component, OnInit } from '@angular/core';
import { PetService } from 'app/services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  Data: any;
  constructor(private modelService: PetService,
    private router: Router) { }

  ngOnInit() {
    this.modelService.getPets().subscribe(pets => {
      this.Data = pets.map(pet =>
        Object.assign({}, {
          Nombre: pet.Name,
          Raza: pet.Race,
          Edad: pet.Age,
          Fecha: pet.Date,
          link: this.router.createUrlTree(['admin', 'edicion-mascota', pet.id]).toString()
        }))
    }, error => {
      alert('Hubo un error en la comunicación con el servido')
    });
  }

}
