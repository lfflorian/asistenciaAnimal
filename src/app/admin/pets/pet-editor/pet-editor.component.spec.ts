import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetEditorComponent } from './pet-editor.component';

describe('PetEditorComponent', () => {
  let component: PetEditorComponent;
  let fixture: ComponentFixture<PetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
