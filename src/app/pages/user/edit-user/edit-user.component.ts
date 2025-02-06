import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import RoleRepresentation, {
  RoleMappingPayload,
} from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  currentRoles: RoleRepresentation[] = [];
  setPassword = false;

  roleSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: false,
  };
  rolesList: RoleRepresentation[] = [];
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    enable: new FormControl(true),
    emailVerified: new FormControl(false),
    password: new FormControl(),
    temporaryPw: new FormControl(false),
    role: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async onSubmit() {
    try {
      this.spinner.show();
      await this.authService.kcAdminClient.users.update(
        {
          id: this.userId,
        },
        {
          username: this.userForm.value.username!,
          email: this.userForm.value.email,
          emailVerified: !!this.userForm.value.emailVerified,
          enabled: !!this.userForm.value.enable,
          firstName: this.userForm.value.firstName,
          lastName: this.userForm.value.lastName,
        }
      );
      if (this.userForm.value.password?.trim) {
        await this.authService.kcAdminClient.users.resetPassword({
          id: this.userId,
          credential: {
            temporary: !!this.userForm.value.temporaryPw,
            type: 'password',
            value: this.userForm.value.password,
          },
        });
      }
      let roles = this.userForm.value.role as RoleMappingPayload[];
      const toBeRemovedRoles = this.currentRoles.filter(
        (cr) => !roles.map((r) => r.id).includes(cr.id!)
      ) as RoleMappingPayload[];
      await this.authService.kcAdminClient.users.delRealmRoleMappings({
        id: this.userId,
        roles: [...toBeRemovedRoles],
      });

      if (roles.length) {
        await this.authService.kcAdminClient.users.addRealmRoleMappings({
          id: this.userId,
          roles: [...roles],
        });
      }
      this.toastr.success('User Updated successfully');
      this.router.navigate(['./../../user-management'], {
        relativeTo: this.activatedRoute,
      });
    } catch (e) {
      console.log(this.toastr.error('Failed to update user'));
    } finally {
      this.spinner.hide();
    }
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.userId = params['id'];
    });
    try {
      this.spinner.show();

      const userDetails = await this.authService.kcAdminClient.users.findOne({
        id: this.userId,
      });
      const availableRoles =
        await this.authService.kcAdminClient.users.listRoleMappings({
          id: this.userId,
        });
      this.currentRoles = availableRoles.realmMappings || [];
      const allRoles = await this.authService.kcAdminClient.roles.find();
      this.rolesList = allRoles;
      this.userForm.patchValue({
        username: userDetails?.username || '',
        email: userDetails?.email || '',
        firstName: userDetails?.firstName || '',
        lastName: userDetails?.lastName || '',
        emailVerified: userDetails?.emailVerified,
        enable: userDetails?.enabled,
        role: this.currentRoles,
      });
    } catch (e) {
      this.toastr.error('Failed to load user details');
    } finally {
      this.spinner.hide();
    }
  }
}
