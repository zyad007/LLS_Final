import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User, UserPayload, UsersGetResponse } from '../../../models/users';

export const loadUsersPage = createAction(
  '[UsersPageComponent] load Users page '
);
export const UsersPageLoaded = createAction(
  '[UsersPageComponent] Users page Loaded',
  props<{ Users: UsersGetResponse; currentPage: number }>()
);

export const loadUsersNext = createAction(
  '[UsersPageComponent] load Users next',
  props<{
    pagination: number;
  }>()
);
export const UsersNextLoaded = createAction(
  '[effect] Users  next  Loaded',
  props<{
    Users: UsersGetResponse;
    currentPage: number;
  }>()
);
export const UsersPageFail = createAction(
  '[effect] Users page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
export const sumbitUsers = createAction(
  '[UsersComponent] Users  submit action',
  props<{ payload: UserPayload }>()
);
export const UsersSubmited = createAction(
  '[UsersEffect] Users  submit data success ',
  props<{ data: User }>()
);
export const editUsers = createAction(
  '[UsersComponent] Users  edit action',
  props<{ payload: UserPayload; id: string }>()
);
export const UsersEdited = createAction(
  '[UsersEffect] Users  edit data success ',
  props<{ User: User; UserId: string | any }>()
);
export const deleteYourUser = createAction(
  '[effect] delete your User ',
  props<{ UserId: any }>()
);
export const yourUserDeleted = createAction(
  '[effect]  your User deleted ',
  props<{ UserId: any }>()
);
