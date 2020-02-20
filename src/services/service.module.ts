import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ZoneService } from './zone.service';



@NgModule({
  providers: [AuthService, UserService, ZoneService]
})
export class ServiceModule { }
