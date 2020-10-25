import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetMedicalReportComponent } from './pet-medical-report.component';

describe('PetMedicalReportComponent', () => {
  let component: PetMedicalReportComponent;
  let fixture: ComponentFixture<PetMedicalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetMedicalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetMedicalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
