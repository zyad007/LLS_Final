import { createReducer, on } from '@ngrx/store';
import { AnalyticCourseOnePage } from '../../../models/analytics-course';
import { AnalyticsCourseActions } from '../action/analytics-course-type';

export const initState: AnalyticCourseOnePage = {
  currentPage: 1,
};
export const AnalyticsCourseReducer = createReducer(
  initState,
  on(AnalyticsCourseActions.AnalyticsCourseLoaded, (state, action) =>
    action.Analytics
      ? {
          ...state,
          [action.currentPage]: action.Analytics,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(AnalyticsCourseActions.AnalyticsCourseNextLoaded, (state, action) => {
    if (action.Analytics) {
      return {
        ...state,
        [action.currentPage]: action.Analytics,
        currentPage: action.currentPage,
      };
    } else {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
  })
);
