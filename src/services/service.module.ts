import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { FiscalYearService } from './fiscal-year.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';
import { ZoneService } from './zone.service';
import { AccountService } from './account.service';

@NgModule({
  providers: [AuthService, UserService, ZoneService, FiscalYearService, AccountService, UtilService]
})
export class ServiceModule { }
