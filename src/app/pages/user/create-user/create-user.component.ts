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
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
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
    username: new FormControl(null, Validators.required),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    enable: new FormControl(true),
    emailVerified: new FormControl(false),
    password: new FormControl(),
    temporaryPw: new FormControl(false),
    role: new FormControl(),
  });
  setPassword = false;

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
      const user = await this.authService.kcAdminClient.users.create({
        username: this.userForm.value.username!,
        email: this.userForm.value.email,
        emailVerified: !!this.userForm.value.emailVerified,
        enabled: !!this.userForm.value.enable,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
      });
      if (this.userForm.value.password?.trim) {
        await this.authService.kcAdminClient.users.resetPassword({
          id: user.id,
          credential: {
            temporary: !!this.userForm.value.temporaryPw,
            type: 'password',
            value: this.userForm.value.password,
          },
        });
      }
      let roles = this.userForm.value.role as RoleMappingPayload[];
      if (roles.length) {
        await this.authService.kcAdminClient.users.addRealmRoleMappings({
          id: user.id,
          roles: [...roles],
        });
      }
      this.toastr.success('User created successfully');
      this.router.navigate(['./../user-management'], {
        relativeTo: this.activatedRoute,
      });
    } catch (e) {
      console.log(this.toastr.error('Failed to save user'));
    } finally {
      this.spinner.hide();
    }
  }

  async ngOnInit() {
    try {
      this.spinner.show();
      //Get All Roles
      this.rolesList = await this.authService.kcAdminClient.roles.find();
    } catch (e) {
      this.toastr.error('Failed to fetch Roles');
    } finally {
      this.spinner.hide();
    }
  }
}
