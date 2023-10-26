import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AnalyticsCourseGetResponse } from '../../../models/analytics-course';

export const loadAnalyticsCourse = createAction(
  '[AnalyticsCourseComponent] load Analytics Course '
);
export const AnalyticsCourseLoaded = createAction(
  '[AnalyticsCourseComponent] Analytics Course Loaded',
  props<{ Analytics: AnalyticsCourseGetResponse; currentPage: number }>()
);

export const loadAnalyticsCourseNext = createAction(
  '[AnalyticsCourseComponent] load Analytics next',
  props<{
    pagination: number;
  }>()
);
export const AnalyticsCourseNextLoaded = createAction(
  '[effect] Analytics  next  Loaded',
  props<{
    Analytics: AnalyticsCourseGetResponse;
    currentPage: number;
  }>()
);
export const AnalyticsCourseFail = createAction(
  '[effect] Analytics Course  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
