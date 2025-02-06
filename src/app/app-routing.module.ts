import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserManagementComponent } from './pages/user/user-management/user-management.component';
import { TokenGenComponent } from './pages/token-gen/token-gen.component';
import { AuthComponent } from './pages/authentication/auth/auth.component';
import { authGuard } from './auth/auth-guard.service';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { CreateRoleComponent } from './pages/role/create-role/create-role.component';
import { RoleManagementComponent } from './pages/role/role-management/role-management.component';
import { EditRoleComponent } from './pages/role/edit-role/edit-role.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  {
    path: 'app',
    component: DashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: 'token',
        component: TokenGenComponent,
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
      },
      {
        path: 'edit-user/:id',
        component: EditUserComponent,
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
      {
        path: 'role-management',
        component: RoleManagementComponent,
      },
      {
        path: 'create-role',
        component: CreateRoleComponent,
      },
      {
        path: 'edit-role/:id',
        component: EditRoleComponent,
      },
      // {
      //   path: '**',
      //   redirectTo: 'profile',
      // },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: 'app',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
