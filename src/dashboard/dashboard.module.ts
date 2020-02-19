import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import { IndexComponent } from './containers/index/index.component';
import { DashboardComponent } from './dashboard.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: IndexComponent },
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, IndexComponent],
  imports: [
    SharedModule, RouterModule.forChild(ROUTES)
  ]
})
export class DashboardModule { }
