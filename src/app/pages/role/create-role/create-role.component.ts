import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss',
})
export class CreateRoleComponent {
  roleForm = new FormGroup({
    roleName: new FormControl('', Validators.required),
    description: new FormControl(),
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

      const roleList = await this.authService.kcAdminClient.roles.find();

      if (roleList.find((role) => role.name === this.roleForm.value.roleName)) {
        this.toastr.error('Role Name aleady Exists!');
        return;
      }

      const user = await this.authService.kcAdminClient.roles.create({
        name: this.roleForm.value.roleName!,
        description: this.roleForm.value.description,
        composite: false,
      });

      this.toastr.success('Role created successfully');
      this.router.navigate(['./../role-management'], {
        relativeTo: this.activatedRoute,
      });
    } catch (e) {
      this.toastr.error('Failed to create role');
    } finally {
      this.spinner.hide();
    }
  }
}
