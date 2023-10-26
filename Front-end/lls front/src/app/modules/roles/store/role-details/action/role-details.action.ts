import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { RoleDetailsGetResponse } from '../../../models/role-details';

export const loadRoleDetail = createAction(
  '[RoleDetail Component] load Role detail ',
  props<{ id: string }>()
);
export const RoleDetailLoaded = createAction(
  '[RoleDetail Effect] Role Detail  Loaded',
  props<{ RoleDetails: RoleDetailsGetResponse; id: string }>()
);
export const RoleDetailFail = createAction(
  '[RoleDetail Effect] Role Detail  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
