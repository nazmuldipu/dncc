import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  show = false;
  appUser$;

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    await this.auth.getUser$().subscribe(user => {
      if (user) {
        this.appUser$ = user;
      }
    });
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  logout() {
    this.appUser$ = null;
    this.auth.logout();
    // this.router.navigate(['/login']);
  }
}
