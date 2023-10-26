import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { ExperimentDetailsState } from '../reducers/experiment-details.reducers';

export const selectExperimentDetailsState =
  createFeatureSelector<ExperimentDetailsState>('ExperimentDetails');
export const selectExperimentDetailsContent = memoize((id: string) =>
  createSelector(
    selectExperimentDetailsState,
    (state) => state?.ExperimentDetails[id]
  )
);
export const selectExperimentDetailsLoaded = memoize((id: string) =>
  createSelector(
    selectExperimentDetailsState,
    (state) => state?.ExperimentDetails[id]?.loaded
  )
);
