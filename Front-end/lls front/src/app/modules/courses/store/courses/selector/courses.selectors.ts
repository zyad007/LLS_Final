import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseOnePage } from '../../../models/courses';

export const selectCoursesState =
  createFeatureSelector<CourseOnePage>('courses');
export const selectCoursesList = createSelector(
  selectCoursesState,
  (CoursesListState) => {
    return CoursesListState[CoursesListState.currentPage]?.data.result;
  }
);

export const selectCoursesNumberOfPages = createSelector(
  selectCoursesState,
  (CoursesListState) => {
    let pages: number[] = [];
    let count: number = CoursesListState[CoursesListState.currentPage]?.data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectCoursesCurrentPage = createSelector(
  selectCoursesState,
  (CoursesListState) => {
    return CoursesListState.currentPage;
  }
);
