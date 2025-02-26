import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authenticationservice';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'pngx-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  show: boolean = false;
  count: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService,
    private setting: SettingsService,
    private router:Router
  ) {
  }
  ngOnInit(): void {
    this.setting.storeSettings()
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    // this.service.getCoookie()
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value)?.subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem("token",res.access)
          this.router.navigate(['/dashboard'])
          window.location.replace('/dashboard')
        },
        (error) => {
          console.log(error);

          if (error.status === 403 && this.count < 2) {
            this.onSubmit()
            this.count = this.count + 1;
          }
        },
      )
    }
  }
  handleCtrlPass(): void {
    this.show = !this.show;
  }

}
