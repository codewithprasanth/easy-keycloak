import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'token-gen',
  templateUrl: './token-gen.component.html',
  styleUrl: './token-gen.component.scss',
})
export class TokenGenComponent implements OnInit {
  token: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.token = this.authService.kcAdminClient.accessToken as string;
  }

  regenerateToken() {
    this.token = this.authService.kcAdminClient.accessToken as string;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.token);
    this.toastr.success('Token copied to clipboard!');
  }
}
