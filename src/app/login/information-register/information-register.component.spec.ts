import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationRegisterComponent } from './information-register.component';

describe('InformationRegisterComponent', () => {
  let component: InformationRegisterComponent;
  let fixture: ComponentFixture<InformationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
