import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AnalyticDetailsGetResponse } from '../../../models/analytics-ero';

export const loadAnalyticDetail = createAction(
  '[AnalyticDetail Component] load Analytic detail ',
  props<{ id: string }>()
);
export const AnalyticDetailLoaded = createAction(
  '[AnalyticDetail Effect] Analytic Detail  Loaded',
  props<{ AnalyticDetails: AnalyticDetailsGetResponse; id: string }>()
);
export const AnalyticDetailFail = createAction(
  '[AnalyticDetail Effect] Analytic Detail  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
