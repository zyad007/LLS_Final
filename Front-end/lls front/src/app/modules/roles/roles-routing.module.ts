import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoleComponent } from './pages/create-role/create-role.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserRolePerComponent } from './pages/user-role-per/user-role-per.component';

const routes: Routes = [
  { path: '', component: UserRolePerComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'create-role', component: CreateRoleComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'role-details/:id', component: RoleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
