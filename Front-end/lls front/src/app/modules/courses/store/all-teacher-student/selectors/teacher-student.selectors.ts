import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memoize } from 'lodash';
import { TeachersStudentss } from '../../../models/teachers-students';

export const selectTeacherStudentState =
  createFeatureSelector<TeachersStudentss>('TeachersStudentss');
export const selectTeacherListStudentList = memoize((key: string | number) =>
  createSelector(selectTeacherStudentState, (state) => {
    return state[key]?.[state[key].currentPage].data.result;
  })
);
export const selectAllTeacherUnAssigned = memoize((key: string | number) =>
  createSelector(selectTeacherStudentState, (state) => {
    return state[key]?.[state[key].currentPage].data.result;

    // return state[key]?.[state[key].currentPage]?.data?.result.filter(
    //   (val) => val.role === 'TEACHER'
    // );
  })
);
// export const selectAllStudentrUnAssigned = memoize((key: string | number) =>
//   createSelector(selectTeacherStudentState, (state) => {
//     return state[key]?.[state[key].currentPage]?.data?.result.filter(
//       (val) => val.role === 'STUDENT'
//     );
//   })
// );

export const selectTeacherStudentNumberOfPages = memoize(
  (key: string | number) =>
    createSelector(selectTeacherStudentState, (state) => {
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
export const selectTeacherStudentCurrentPage = memoize((key: string | number) =>
  createSelector(selectTeacherStudentState, (state) => {
    return state[key]?.currentPage;
  })
);
