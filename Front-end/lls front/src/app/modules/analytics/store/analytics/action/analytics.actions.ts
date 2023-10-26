import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AnalyticsGetResponse } from '../../../models/analytics';

export const loadAnalyticsPage = createAction(
  '[AnalyticsPageComponent] load Analytics page '
);
export const AnalyticsPageLoaded = createAction(
  '[AnalyticsPageComponent] Analytics page Loaded',
  props<{ Analytics: AnalyticsGetResponse; currentPage: number }>()
);

export const loadAnalyticsNext = createAction(
  '[AnalyticsPageComponent] load Analytics next',
  props<{
    pagination: number;
  }>()
);
export const AnalyticsNextLoaded = createAction(
  '[effect] Analytics  next  Loaded',
  props<{
    Analytics: AnalyticsGetResponse;
    currentPage: number;
  }>()
);
export const AnalyticsPageFail = createAction(
  '[effect] Analytics page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
