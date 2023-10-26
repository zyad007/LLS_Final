import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { RoleDetailsState } from '../reducers/role-details.reducers';

export const selectRoleDetailsState =
  createFeatureSelector<RoleDetailsState>('RoleDetails');
export const selectRoleDetailsContent = memoize((id: string) =>
  createSelector(selectRoleDetailsState, (state) => state?.RoleDetails[id])
);
export const selectRoleDetailsLoaded = memoize((id: string) =>
  createSelector(
    selectRoleDetailsState,
    (state) => state?.RoleDetails[id]?.loaded
  )
);
