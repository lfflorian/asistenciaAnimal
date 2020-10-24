import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCamComponent } from './session-cam.component';

describe('SessionCamComponent', () => {
  let component: SessionCamComponent;
  let fixture: ComponentFixture<SessionCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
