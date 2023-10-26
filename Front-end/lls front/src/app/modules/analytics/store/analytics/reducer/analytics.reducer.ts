import { createReducer, on } from '@ngrx/store';
import { AnalyticOnePage } from '../../../models/analytics';
import { AnalyticsPageActions } from '../action/analytics-type';

export const initState: AnalyticOnePage = {
  currentPage: 1,
};
export const AnalyticsPageReducer = createReducer(
  initState,
  on(AnalyticsPageActions.AnalyticsPageLoaded, (state, action) =>
    action.Analytics
      ? {
          ...state,
          [action.currentPage]: action.Analytics,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(AnalyticsPageActions.AnalyticsNextLoaded, (state, action) => {
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
