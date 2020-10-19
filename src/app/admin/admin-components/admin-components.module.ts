import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list/table-list.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  declarations: [
    TableListComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  exports: [
    TableListComponent,
    ImageUploadComponent
  ]
})
export class AdminComponentsModule { }
