import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCardTwoComponent } from './pet-card-two.component';

describe('PetCardTwoComponent', () => {
  let component: PetCardTwoComponent;
  let fixture: ComponentFixture<PetCardTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetCardTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
