import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { UserDetailsState } from '../reducers/user-details.reducers';

export const selectUserDetailsState =
  createFeatureSelector<UserDetailsState>('UserDetails');
export const selectUserDetailsContent = memoize((id: string) =>
  createSelector(selectUserDetailsState, (state) => state?.UserDetails[id])
);
export const selectUserDetailsLoaded = memoize((id: string) =>
  createSelector(
    selectUserDetailsState,
    (state) => state?.UserDetails[id]?.loaded
  )
);
