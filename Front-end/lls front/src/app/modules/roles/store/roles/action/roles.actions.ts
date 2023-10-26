import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Role, RolePayload, RolesGetResponse } from '../../../models/roles';

export const loadRolesPage = createAction(
  '[RolesPageComponent] load Roles page '
);
export const RolesPageLoaded = createAction(
  '[RolesPageComponent] Roles page Loaded',
  props<{ Roles: RolesGetResponse; currentPage: number }>()
);

export const loadRolesNext = createAction(
  '[RolesPageComponent] load Roles next',
  props<{
    pagination: number;
  }>()
);
export const RolesNextLoaded = createAction(
  '[effect] Roles  next  Loaded',
  props<{
    Roles: RolesGetResponse;
    currentPage: number;
  }>()
);
export const RolesPageFail = createAction(
  '[effect] Roles page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
export const sumbitRoles = createAction(
  '[RolesComponent] Roles  submit action',
  props<{ payload: RolePayload }>()
);
export const RolesSubmited = createAction(
  '[RolesEffect] Roles  submit data success ',
  props<{ data: Role }>()
);
export const editRoles = createAction(
  '[RolesComponent] Roles  edit action',
  props<{ payload: RolePayload; id: string }>()
);
export const RolesEdited = createAction(
  '[RolesEffect] Roles  edit data success ',
  props<{ Role: Role; RoleId: string | any }>()
);
export const deleteYourRole = createAction(
  '[effect] delete your Role ',
  props<{ RoleId: any }>()
);
export const yourRoleDeleted = createAction(
  '[effect]  your Role deleted ',
  props<{ RoleId: any }>()
);
