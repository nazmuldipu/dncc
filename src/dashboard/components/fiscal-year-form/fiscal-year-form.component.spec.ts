import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearFormComponent } from './fiscal-year-form.component';

describe('FiscalYearFormComponent', () => {
  let component: FiscalYearFormComponent;
  let fixture: ComponentFixture<FiscalYearFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiscalYearFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalYearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
