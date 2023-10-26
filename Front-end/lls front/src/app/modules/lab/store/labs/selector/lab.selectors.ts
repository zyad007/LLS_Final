import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LabOnePage } from '../../../models/lab';

export const selectLabsState = createFeatureSelector<LabOnePage>('Labs');
export const selectLabsList = createSelector(
  selectLabsState,
  (LabsListState) => {
    return LabsListState[LabsListState.currentPage]?.data.result;
  }
);

export const selectLabsNumberOfPages = createSelector(
  selectLabsState,
  (LabsListState) => {
    let pages: number[] = [];
    let count: number = LabsListState[LabsListState.currentPage]?.data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectLabsCurrentPage = createSelector(
  selectLabsState,
  (LabsListState) => {
    return LabsListState.currentPage;
  }
);
