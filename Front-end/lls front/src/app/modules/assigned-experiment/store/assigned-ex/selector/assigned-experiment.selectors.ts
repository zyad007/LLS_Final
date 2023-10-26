import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssignedExperimentOnePage } from '../../../models/assigned-experiment';

export const selectAssignedExperimentState =
  createFeatureSelector<AssignedExperimentOnePage>('AssignedExperiment');
export const selectAssignedExperimentList = createSelector(
  selectAssignedExperimentState,
  (AssignedExperimentListState) => {
    return AssignedExperimentListState[AssignedExperimentListState.currentPage]
      ?.data.result;
  }
);

export const selectAssignedExperimentNumberOfPages = createSelector(
  selectAssignedExperimentState,
  (AssignedExperimentListState) => {
    let pages: number[] = [];
    let count: number =
      AssignedExperimentListState[AssignedExperimentListState.currentPage]?.data
        .count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectAssignedExperimentCurrentPage = createSelector(
  selectAssignedExperimentState,
  (AssignedExperimentListState) => {
    return AssignedExperimentListState.currentPage;
  }
);
