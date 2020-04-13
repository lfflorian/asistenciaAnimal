import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConsultationsComponent } from './general-consultations.component';

describe('GeneralConsultationsComponent', () => {
  let component: GeneralConsultationsComponent;
  let fixture: ComponentFixture<GeneralConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralConsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
