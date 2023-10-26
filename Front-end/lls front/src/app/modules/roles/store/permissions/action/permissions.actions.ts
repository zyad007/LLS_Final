import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  Permission,
  PermissionOneGetResponse,
  PermissionPayload,
  PermissionsGetResponse,
} from '../../../models/permissions';

export const loadPermissionsPage = createAction(
  '[PermissionsPageComponent] load Permissions page '
);
export const PermissionsPageLoaded = createAction(
  '[PermissionsPageComponent] Permissions page Loaded',
  props<{ Permissions: PermissionsGetResponse; currentPage: number }>()
);

export const loadPermissionsNext = createAction(
  '[PermissionsPageComponent] load Permissions next',
  props<{
    pagination: number;
  }>()
);
export const PermissionsNextLoaded = createAction(
  '[effect] Permissions  next  Loaded',
  props<{
    Permissions: PermissionsGetResponse;
    currentPage: number;
  }>()
);
export const PermissionsPageFail = createAction(
  '[effect] Permissions page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
export const sumbitPermissions = createAction(
  '[PermissionsComponent] Permissions  submit action',
  props<{ payload: PermissionPayload }>()
);
export const PermissionsSubmited = createAction(
  '[PermissionsEffect] Permissions  submit data success ',
  props<{ data: PermissionOneGetResponse }>()
);
export const editPermissions = createAction(
  '[PermissionsComponent] Permissions  edit action',
  props<{ payload: PermissionPayload; id: string }>()
);
export const PermissionsEdited = createAction(
  '[PermissionsEffect] Permissions  edit data success ',
  props<{ Permission: Permission; PermissionId: string | any }>()
);
export const deleteYourPermission = createAction(
  '[effect] delete your Permission ',
  props<{ PermissionId: any }>()
);
export const yourPermissionDeleted = createAction(
  '[effect]  your Permission deleted ',
  props<{ PermissionId: any }>()
);
