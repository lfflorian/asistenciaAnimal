import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultViewComponent } from './consult-view.component';

describe('ConsultViewComponent', () => {
  let component: ConsultViewComponent;
  let fixture: ComponentFixture<ConsultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
