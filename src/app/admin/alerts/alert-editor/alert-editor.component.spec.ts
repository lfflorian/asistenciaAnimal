import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEditorComponent } from './alert-editor.component';

describe('AlertEditorComponent', () => {
  let component: AlertEditorComponent;
  let fixture: ComponentFixture<AlertEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
