import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-user-role-per',
  templateUrl: './user-role-per.component.html',
  styleUrls: ['./user-role-per.component.scss'],
})
export class UserRolePerComponent implements OnInit {
  constructor(
    public roleService: RolesService,
    public authServices: AuthService
  ) {}

  ngOnInit(): void {}
  isUser() {
    this.roleService.isPermissions = false;
    this.roleService.isRole = false;
    this.roleService.isUser = true;
  }
  isRole() {
    this.roleService.isPermissions = false;
    this.roleService.isRole = true;
    this.roleService.isUser = false;
  }
  isPermission() {
    this.roleService.isPermissions = true;
    this.roleService.isRole = false;
    this.roleService.isUser = false;
  }
}
