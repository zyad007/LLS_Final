import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { Teachers } from '../../../models/teachers';

export const selectTeacherState = createFeatureSelector<Teachers>('Teachers');
export const selectTeacherList = memoize((key: string | number) =>
  createSelector(selectTeacherState, (state) => {
    return state[key]?.[state[key].currentPage].data.result;
  })
);

export const selectTeacherNumberOfPages = memoize((key: string | number) =>
  createSelector(selectTeacherState, (state) => {
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
export const selectTeacherCurrentPage = memoize((key: string | number) =>
  createSelector(selectTeacherState, (state) => {
    return state[key]?.currentPage;
  })
);
// export const selectTeacherSuccessMessage = memoize((key: string | number) =>
//   createSelector(selectTeacherState, (state) => {
//     return state[key]?.message;
//   })
// );
