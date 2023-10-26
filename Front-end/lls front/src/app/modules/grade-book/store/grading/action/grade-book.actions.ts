import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  GradeBookGetResponse,
  GradingOnePage,
} from '../../../models/grade-book';

export const loadGradingPage = createAction(
  '[GradingPageComponent] load Grading page ',
  props<{ idd: string; expIdd: string }>()
);
export const GradingPageLoaded = createAction(
  '[GradingPageComponent] Grading page Loaded',
  props<{ Grading: GradingOnePage }>()
);

export const loadGradingNext = createAction(
  '[GradingPageComponent] load Grading next',
  props<{
    pagination: number;
    id: string | number;
    expIdd: string;
  }>()
);
export const GradingNextLoaded = createAction(
  '[effect] Grading  next  Loaded',
  props<{
    Grading: GradeBookGetResponse;
    id: string | number;
    currntPage: number;
  }>()
);
export const GradingPageFail = createAction(
  '[effect] Grading page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
