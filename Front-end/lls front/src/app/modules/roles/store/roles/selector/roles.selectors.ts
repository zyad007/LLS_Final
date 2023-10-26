import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleOnePage } from '../../../models/roles';

export const selectRolesState = createFeatureSelector<RoleOnePage>('Roles');
export const selectRolesList = createSelector(
  selectRolesState,
  (RolesListState) => {
    return RolesListState[RolesListState.currentPage]?.data.result;
  }
);

export const selectRolesNumberOfPages = createSelector(
  selectRolesState,
  (RolesListState) => {
    let pages: number[] = [];
    let count: number = RolesListState[RolesListState.currentPage]?.data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectRolesCurrentPage = createSelector(
  selectRolesState,
  (RolesListState) => {
    return RolesListState.currentPage;
  }
);
