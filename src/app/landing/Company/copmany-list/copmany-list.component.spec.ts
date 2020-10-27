import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopmanyListComponent } from './copmany-list.component';

describe('CopmanyListComponent', () => {
  let component: CopmanyListComponent;
  let fixture: ComponentFixture<CopmanyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopmanyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopmanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
