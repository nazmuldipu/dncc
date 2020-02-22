import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { FiscalYearService } from './fiscal-year.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';
import { ZoneService } from './zone.service';

@NgModule({
  providers: [AuthService, UserService, ZoneService, FiscalYearService, UtilService]
})
export class ServiceModule { }
