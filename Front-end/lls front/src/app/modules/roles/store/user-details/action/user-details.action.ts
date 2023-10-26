import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserDetailsGetResponse } from '../../../models/user-details';

export const loadUserDetail = createAction(
  '[UserDetail Component] load User detail ',
  props<{ id: string }>()
);
export const UserDetailLoaded = createAction(
  '[UserDetail Effect] User Detail  Loaded',
  props<{ UserDetails: UserDetailsGetResponse; id: string }>()
);
export const UserDetailFail = createAction(
  '[UserDetail Effect] User Detail  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
