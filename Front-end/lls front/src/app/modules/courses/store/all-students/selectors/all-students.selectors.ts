import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { AllStudents } from '../../../models/all-student';

export const selectAllStudentsState =
  createFeatureSelector<AllStudents>('AllStudents');

export const selectAllStudentUnAssigned = memoize((key: string | number) =>
  createSelector(selectAllStudentsState, (state) => {

    return state[key]?.[state[key].currentPage].data.result;
  })
);

export const selectAllStudentNumberOfPages = memoize((key: string | number) =>
  createSelector(selectAllStudentsState, (state) => {
    let pages: number[] = [];
    let count: number = state[key]?.[state[key]?.currentPage]?.data?.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  })
);
export const selectAllStudentCurrentPage = memoize((key: string | number) =>
  createSelector(selectAllStudentsState, (state) => {
    return state[key]?.currentPage;
  })
);
