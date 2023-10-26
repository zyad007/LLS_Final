import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { ExperimentOnePage } from '../../../models/show-experiment';

export const selectExperimentsShState =
  createFeatureSelector<ExperimentOnePage>('ExperimentsSh');
export const selectExperimentsShList = createSelector(
  selectExperimentsShState,
  (ExperimentsShListState) => {
    return ExperimentsShListState[ExperimentsShListState.currentPage]?.data
      ?.result;
  }
);
export const selectExperimentList = memoize((key: string | number) =>
  createSelector(selectExperimentsShState, (state) => {
    return state?.[state.currentPage].data.result;
  })
);
export const selectExperimentsShNumberOfPages = createSelector(
  selectExperimentsShState,
  (ExperimentsShListState) => {
    let pages: number[] = [];
    let count: number =
      ExperimentsShListState[ExperimentsShListState.currentPage]?.data?.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectExperimentsShCurrentPage = createSelector(
  selectExperimentsShState,
  (ExperimentsShListState) => {
    return ExperimentsShListState.currentPage;
  }
);
