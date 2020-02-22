import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearComponent } from './fiscal-year.component';

describe('FiscalYearComponent', () => {
  let component: FiscalYearComponent;
  let fixture: ComponentFixture<FiscalYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiscalYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
