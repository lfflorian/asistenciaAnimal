import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list/table-list.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import { MatCardModule , MatButtonModule  } from '@angular/material';
import { FilesUploadComponent } from './files-upload/files-upload.component';

@NgModule({
  declarations: [
    TableListComponent,
    ImageUploadComponent,
    PetCardComponent,
    FilesUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    TableListComponent,
    ImageUploadComponent,
    PetCardComponent,
    FilesUploadComponent
  ]
})
export class AdminComponentsModule { }
