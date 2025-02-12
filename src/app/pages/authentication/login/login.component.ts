import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth-service';

export interface LoginFormType {
  clientId: string | null;
  userName: string | null;
  password: string | null;
  grantType: string | null;
  clientSecret: string | null;
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  @Output() onLogin = new EventEmitter<LoginFormType>();

  grantTypeList = [
    {
      name: 'password',
      value: 'password',
    },
  ];

  loginForm = new FormGroup({
    clientId: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    grantType: new FormControl('password', Validators.required),
    clientSecret: new FormControl(''),
  });

  submitLogin() {
    this.authService.clientId = this.loginForm.value.clientId as string;
    this.authService.userName = this.loginForm.value.userName as string;
    this.authService.password = this.loginForm.value.password as string;
    this.authService.grantType = this.loginForm.value.grantType as string;
    this.authService.clientSecret = this.loginForm.value.clientSecret as string;
    this.onLogin.emit(this.loginForm.value as LoginFormType);
  }
}
