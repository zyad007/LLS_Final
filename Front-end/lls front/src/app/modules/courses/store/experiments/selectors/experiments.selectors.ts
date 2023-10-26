import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { Experiments } from '../../../models/experiment';

export const selectExperimentState =
  createFeatureSelector<Experiments>('Experiments');
export const selectExperimentList = memoize((key: string | number) =>
  createSelector(selectExperimentState, (state) => {
    return state[key]?.[state[key].currentPage].data.result;
  })
);

export const selectExperimentNumberOfPages = memoize((key: string | number) =>
  createSelector(selectExperimentState, (state) => {
    let pages: number[] = [];
    let count: number = state[key]?.[state[key]?.currentPage].data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  })
);
export const selectExperimentCurrentPage = memoize((key: string | number) =>
  createSelector(selectExperimentState, (state) => {
    return state[key]?.currentPage;
  })
);
