import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.userId = params['id'];
      const userDetails = await this.authService.kcAdminClient.users.findOne({
        id: this.userId,
      });

      console.log(userDetails);

      const availableRoles =
        await this.authService.kcAdminClient.users.listAvailableRealmRoleMappings(
          {
            id: this.userId,
          }
        );

      console.log(availableRoles);
    });
  }

  onEdit() {
    this.router.navigate(['./../../edit-user', this.userId], {
      relativeTo: this.activatedRoute,
    });
  }
}
