import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetCardComponent } from './pet-card/pet-card.component';



@NgModule({
  declarations: [PetCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PetCardComponent
  ]
})
export class LandingComponentsModule { }
