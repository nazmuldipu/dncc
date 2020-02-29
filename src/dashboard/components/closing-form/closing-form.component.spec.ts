import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingFormComponent } from './closing-form.component';

describe('ClosingFormComponent', () => {
  let component: ClosingFormComponent;
  let fixture: ComponentFixture<ClosingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
