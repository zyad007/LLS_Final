import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticOnePage } from '../../../models/analytics';

export const selectAnalyticsState =
  createFeatureSelector<AnalyticOnePage>('Analytics');
export const selectAnalyticsList = createSelector(
  selectAnalyticsState,
  (AnalyticsListState) => {
    return AnalyticsListState[AnalyticsListState.currentPage]?.data.result;
  }
);

export const selectAnalyticsNumberOfPages = createSelector(
  selectAnalyticsState,
  (AnalyticsListState) => {
    let pages: number[] = [];
    let count: number =
      AnalyticsListState[AnalyticsListState.currentPage]?.data.count;
    if (count) {
      let countDown: number = Math.ceil(count / 10);
      for (let i = 0; i < countDown; i++) {
        pages.push(i + 1);
      }
    }
    return pages;
  }
);
export const selectAnalyticsCurrentPage = createSelector(
  selectAnalyticsState,
  (AnalyticsListState) => {
    return AnalyticsListState.currentPage;
  }
);
