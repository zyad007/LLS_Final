import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  isRole: boolean = false;
  isPermissions: boolean = false;
  isUser: boolean = true;
  constructor() {}
}
