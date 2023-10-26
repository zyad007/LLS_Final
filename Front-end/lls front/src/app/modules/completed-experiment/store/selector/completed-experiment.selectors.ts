import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompletedExperimentOnePage } from '../../models/completed-experiment';

export const selectCompletedExperimentState =
  createFeatureSelector<CompletedExperimentOnePage>('CompletedExperiment');
export const selectCompletedExperimentList = createSelector(
  selectCompletedExperimentState,
  (CompletedExperimentListState) => {
    return CompletedExperimentListState[
      CompletedExperimentListState.currentPage
    ]?.data.result;
  }
);

export const selectCompletedExperimentNumberOfPages = createSelector(
  selectCompletedExperimentState,
  (CompletedExperimentListState) => {
    let pages: number[] = [];
    let count: number =
      CompletedExperimentListState[CompletedExperimentListState.currentPage]
        ?.data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectCompletedExperimentCurrentPage = createSelector(
  selectCompletedExperimentState,
  (CompletedExperimentListState) => {
    return CompletedExperimentListState.currentPage;
  }
);
