import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import { IndexComponent } from './containers/index/index.component';
import { DashboardComponent } from './dashboard.component';
import { DashNavComponent } from './components/dash-nav/dash-nav.component';
import { ZoneComponent } from './containers/zone/zone.component';
import { ZoneFormComponent } from './components/zone-form/zone-form.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { FiscalYearComponent } from './containers/fiscal-year/fiscal-year.component';
import { FiscalYearListComponent } from './components/fiscal-year-list/fiscal-year-list.component';
import { FiscalYearFormComponent } from './components/fiscal-year-form/fiscal-year-form.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'fiscal-year', component: FiscalYearComponent },
      { path: 'zone', component: ZoneComponent },
      { path: '', component: IndexComponent },
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, IndexComponent, DashNavComponent, ZoneComponent, ZoneFormComponent, ZoneListComponent, FiscalYearComponent, FiscalYearListComponent, FiscalYearFormComponent],
  imports: [
    SharedModule, RouterModule.forChild(ROUTES)
  ]
})
export class DashboardModule { }
