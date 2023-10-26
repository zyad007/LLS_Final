import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionOnePage } from '../../../models/permissions';

export const selectPermissionsState =
  createFeatureSelector<PermissionOnePage>('Permissions');
export const selectPermissionsList = createSelector(
  selectPermissionsState,
  (PermissionsListState) => {
    return PermissionsListState[PermissionsListState.currentPage]?.data;
  }
);

export const selectPermissionsNumberOfPages = createSelector(
  selectPermissionsState,
  (PermissionsListState) => {
    let pages: number[] = [];
    let count: number =
      PermissionsListState[PermissionsListState.currentPage]?.data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectPermissionsCurrentPage = createSelector(
  selectPermissionsState,
  (PermissionsListState) => {
    return PermissionsListState.currentPage;
  }
);
