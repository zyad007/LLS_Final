import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CompletedExperimentGetResponse } from '../../models/completed-experiment';

export const loadCompletedExperiments = createAction(
  '[CompletedExperiment] Load CompletedExperiments'
);

export const CompletedExperimentPageLoaded = createAction(
  '[CompletedExperimentPageComponent] CompletedExperiment page Loaded',
  props<{
    CompletedExperiment: CompletedExperimentGetResponse;
    currentPage: number;
  }>()
);

export const loadCompletedExperimentNext = createAction(
  '[CompletedExperimentPageComponent] load CompletedExperiment next',
  props<{
    pagination: number;
  }>()
);
export const CompletedExperimentNextLoaded = createAction(
  '[effect] CompletedExperiment  next  Loaded',
  props<{
    CompletedExperiment: CompletedExperimentGetResponse;
    currentPage: number;
  }>()
);
export const CompletedExperimentPageFail = createAction(
  '[effect] CompletedExperiment page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
