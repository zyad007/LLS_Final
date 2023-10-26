import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileUploadModule } from 'primeng/fileupload';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CreateRoleComponent } from './pages/create-role/create-role.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditPermissionComponent } from './pages/edit-permission/edit-permission.component';
import { EditRoleComponent } from './pages/edit-role/edit-role.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { PermissionsDetailsComponent } from './pages/permissions-details/permissions-details.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserRolePerComponent } from './pages/user-role-per/user-role-per.component';
import { UserComponent } from './pages/user/user.component';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  declarations: [
    RolesComponent,
    UserComponent,
    UserDetailsComponent,
    CreateUserComponent,
    EditUserComponent,
    EditRoleComponent,
    CreateRoleComponent,
    RoleDetailsComponent,
    PermissionsComponent,
    PermissionsDetailsComponent,
    EditPermissionComponent,
    UserRolePerComponent,
  ],
  imports: [CommonModule, RolesRoutingModule, SharedModule, FileUploadModule],
})
export class RolesModule {}
