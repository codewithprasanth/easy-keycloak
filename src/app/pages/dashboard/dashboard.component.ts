import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  displayName = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.displayName = this.authService.currentUserFullName;
  }

  logout() {
    this.authService.logout();
  }
}
