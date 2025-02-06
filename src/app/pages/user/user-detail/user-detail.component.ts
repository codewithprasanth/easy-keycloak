import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import RoleRepresentation from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  user!: UserRepresentation;
  roles!: RoleRepresentation[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  async ngOnInit() {
    try {
      this.spinner.show();
      this.activatedRoute.params.subscribe(async (params) => {
        this.userId = params['id'];
        const userDetails = await this.authService.kcAdminClient.users.findOne({
          id: this.userId,
        });
        this.user = userDetails!;
        const availableRoles =
          await this.authService.kcAdminClient.users.listRoleMappings({
            id: this.userId,
          });
        this.roles = availableRoles.realmMappings!;
      });
    } catch (e) {
      this.toastr.error('Failed to load user Details.');
    } finally {
      this.spinner.hide();
    }
  }

  onEdit() {
    this.router.navigate(['./../../edit-user', this.userId], {
      relativeTo: this.activatedRoute,
    });
  }
}
