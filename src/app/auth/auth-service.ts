import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { GrantTypes } from '@keycloak/keycloak-admin-client/lib/utils/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  kcAdminClient!: KeycloakAdminClient;

  realm: string = '';
  baseUrl: string = '';

  clientId: string = '';
  userName: string = '';
  password: string = '';
  grantType: string = '';
  clientSecret: string = '';

  currentUserId: string = '';
  currentUserFullName: string = '';

  isLoggedIn = false;

  constructor(private router: Router) {}

  login() {
    this.kcAdminClient = new KeycloakAdminClient({
      baseUrl: this.baseUrl,
      realmName: this.realm,
    });
    return this.kcAdminClient.auth({
      clientId: this.clientId,
      grantType: this.grantType as GrantTypes,
      username: this.userName,
      password: this.password,
      clientSecret: this.clientSecret,
    });
  }

  logout() {
    this.kcAdminClient.users.logout({
      realm: this.realm,
      id: this.currentUserId,
    });
    this.isLoggedIn = false;
    this.router.navigate(['/auth']);
  }
}
