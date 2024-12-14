import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'token-gen',
  templateUrl: './token-gen.component.html',
  styleUrl: './token-gen.component.scss',
})
export class TokenGenComponent implements OnInit {
  token: string = '';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.token = this.authService.kcAdminClient.accessToken as string;
  }
}
