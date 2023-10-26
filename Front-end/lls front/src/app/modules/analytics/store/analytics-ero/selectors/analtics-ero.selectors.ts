import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { AnalyticDetailsState } from '../reducers/analtics-ero.reducers';

export const selectAnalyticDetailsState =
  createFeatureSelector<AnalyticDetailsState>('AnalyticDetails');
export const selectAnalyticDetailsContent = memoize((id: string) =>
  createSelector(
    selectAnalyticDetailsState,
    (state) => state?.AnalyticDetails[id]
  )
);
export const selectAnalyticDetailsLoaded = memoize((id: string) =>
  createSelector(
    selectAnalyticDetailsState,
    (state) => state?.AnalyticDetails[id]?.loaded
  )
);
