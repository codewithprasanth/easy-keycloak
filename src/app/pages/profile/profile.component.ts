import { Component, OnInit } from '@angular/core';
import RoleRepresentation from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: UserRepresentation;
  roles!: RoleRepresentation[];
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  async ngOnInit() {
    try {
      this.spinner.show();
      const userDetails = await this.authService.kcAdminClient.users.findOne({
        id: this.authService.currentUserId,
      });
      this.user = userDetails!;
      const availableRoles =
        await this.authService.kcAdminClient.users.listRoleMappings({
          id: this.authService.currentUserId,
        });
      this.roles = availableRoles.realmMappings!;
      console.log(this.roles);
    } catch (e) {
      this.toastr.error('Failed to load user profile.');
    } finally {
      this.spinner.hide();
    }
  }
}
