import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  RoleDetailsGetResponse,
  RoleDetailsResponse,
} from '../../../models/role-details';
import { RoleDetailsActions } from '../action/role-details-type';

export interface RoleDetailsState {
  RoleDetails: RoleDetailsResponse;
}
export const initState: RoleDetailsState = {
  RoleDetails: {},
};

export const RoleDetailsReducer = createReducer(
  initState,
  on(RoleDetailsActions.RoleDetailLoaded, (state, action) => {
    const newDictionrey: { [key: string]: RoleDetailsGetResponse } = cloneDeep(
      state.RoleDetails
    );
    newDictionrey[action.id] = { ...action.RoleDetails, loaded: true };
    return action.RoleDetails
      ? {
          ...state,
          RoleDetails: newDictionrey,
        }
      : { ...state };
  })
);
