import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticCourseOnePage } from '../../../models/analytics-course';

export const selectAnalyticsCourseState =
  createFeatureSelector<AnalyticCourseOnePage>('AnalyticsCourseCourse');
export const selectAnalyticsCourseList = createSelector(
  selectAnalyticsCourseState,
  (AnalyticsCourseListState) => {
    return AnalyticsCourseListState[AnalyticsCourseListState.currentPage]?.data
      .result;
  }
);
export const selectAnalyticsCourseNumberOfPages = createSelector(
  selectAnalyticsCourseState,
  (AnalyticsCourseListState) => {
    let pages: number[] = [];
    let count: number =
      AnalyticsCourseListState[AnalyticsCourseListState.currentPage]?.data
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
export const selectAnalyticsCourseCurrentPage = createSelector(
  selectAnalyticsCourseState,
  (AnalyticsCourseListState) => {
    return AnalyticsCourseListState.currentPage;
  }
);
