import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { GradingOnePage } from '../../../models/grade-book';

export const selectGradingState =
  createFeatureSelector<GradingOnePage>('Grading');
export const selectGradingList = memoize((key: string | number) =>
  createSelector(selectGradingState, (state) => {
    return state[key]?.[state[key].currentPage]?.data?.result;
  })
);

export const selectGradingNumberOfPages = memoize((key: string | number) =>
  createSelector(selectGradingState, (state) => {
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
export const selectGradingCurrentPage = memoize((key: string | number) =>
  createSelector(selectGradingState, (state) => {
    return state[key]?.currentPage;
  })
);
