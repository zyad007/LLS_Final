import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  UserDetailsGetResponse,
  UserDetailsResponse,
} from '../../../models/user-details';
import { UserDetailsActions } from '../action/user-details-type';

export interface UserDetailsState {
  UserDetails: UserDetailsResponse;
}
export const initState: UserDetailsState = {
  UserDetails: {},
};

export const UserDetailsReducer = createReducer(
  initState,
  on(UserDetailsActions.UserDetailLoaded, (state, action) => {
    const newDictionrey: { [key: string]: UserDetailsGetResponse } = cloneDeep(
      state.UserDetails
    );
    newDictionrey[action.id] = { ...action.UserDetails, loaded: true };
    return action.UserDetails
      ? {
          ...state,
          UserDetails: newDictionrey,
        }
      : { ...state };
  })
);
