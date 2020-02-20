import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = "";
  loading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.valid) {
      this.errorMessage = "";
      this.loading = true;
      this.auth.loginWithEmail(this.form.controls.username.value, this.form.controls.password.value)
        .then(data => {
          this.userService.get(data.user.uid).subscribe(datar => {
            this.loading = false;
            this.router.navigate(['/dashboard']);
          }, error => {
            this.loading = false;
            this.errorMessage = error.message;
          })
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error.message;
        });

    } else {
      this.errorMessage = "Form data missing";
    }
  }

}
