import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './containers/index/index.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, IndexComponent, LoginComponent, RegisterComponent, NavbarComponent],
  imports: [
    SharedModule, RouterModule.forChild(ROUTES)
  ]
})
export class HomeModule { }
