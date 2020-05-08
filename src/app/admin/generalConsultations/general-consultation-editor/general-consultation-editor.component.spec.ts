import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConsultationEditorComponent } from './general-consultation-editor.component';

describe('GeneralConsultationEditorComponent', () => {
  let component: GeneralConsultationEditorComponent;
  let fixture: ComponentFixture<GeneralConsultationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralConsultationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConsultationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
