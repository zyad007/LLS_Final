import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserOnePage } from '../../../models/users';

export const selectUsersState = createFeatureSelector<UserOnePage>('Users');
export const selectUsersList = createSelector(
  selectUsersState,
  (UsersListState) => {
    return UsersListState[UsersListState.currentPage]?.data.result;
  }
);

export const selectUsersNumberOfPages = createSelector(
  selectUsersState,
  (UsersListState) => {
    let pages: number[] = [];
    let count: number = UsersListState[UsersListState.currentPage]?.data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectUsersCurrentPage = createSelector(
  selectUsersState,
  (UsersListState) => {
    return UsersListState.currentPage;
  }
);
