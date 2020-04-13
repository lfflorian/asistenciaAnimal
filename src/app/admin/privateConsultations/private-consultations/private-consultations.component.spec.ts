import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateConsultationsComponent } from './private-consultations.component';

describe('PrivateConsultationsComponent', () => {
  let component: PrivateConsultationsComponent;
  let fixture: ComponentFixture<PrivateConsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateConsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
