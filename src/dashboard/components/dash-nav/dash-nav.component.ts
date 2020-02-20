import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
})
export class DashNavComponent implements OnInit {
  show = false;
  appUser$;
  appUser;
  roles = [];

  constructor(private auth: AuthService,
    private userService: UserService,
    private router: Router) { }

  async ngOnInit() {
    await this.auth.getUser$().pipe(take(1)).subscribe(user => {
      if (user) {
        this.appUser$ = user;
        this.userService.get(user.uid).pipe(take(1))
          .subscribe(data => {
            this.appUser = data;
            this.auth._userSource.next(this.appUser);
            let companyId = this.appUser.companyId;
            if (this.appUser.companyId) {
              localStorage.setItem('companyId', companyId);
              // this.groupService.getAndStoreAll(companyId);
              // this.peopleService.getAndStoreAll(companyId);
              // this.companyService.getAndStore(companyId);

            } else {
              localStorage.removeItem('companyId');
            }
            this.roles = this.appUser.role;
          });
      }
    });
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  hasAdminRole(): boolean {
    return this.roles.includes('ADMIN');
  }

  hasCompanyRole(): boolean {
    return this.roles.includes('COMPANY') && !!this.appUser.companyId;
  }

  logout() {
    this.appUser$ = null;
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
