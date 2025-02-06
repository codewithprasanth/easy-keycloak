import { Component } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';
import { ConfigurationFormType } from 'src/app/pages/authentication/configuration/configuration.component';
import { LoginFormType } from 'src/app/pages/authentication/login/login.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(
    private readonly authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  showLogin = false;
  submitConfig(conf: ConfigurationFormType) {
    this.showLogin = true;
  }

  editConfig() {
    this.showLogin = false;
  }

  login(login: LoginFormType) {
    this.spinner.show();
    this.authService
      .login()
      .then(async () => {
        const whoAmI = await this.authService.kcAdminClient.whoAmI.find();
        this.authService.currentUserFullName = whoAmI.displayName;
        this.authService.currentUserId = whoAmI.userId;
        this.authService.isLoggedIn = true;
        this.router.navigate(['/app']);
      })
      .catch((e) => {
        this.toastr.error('Failed to login');
      })
      .finally(() => {
        this.spinner.hide();
      });
  }
}
