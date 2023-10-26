import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AssignedExperimentGetResponse } from '../../../models/assigned-experiment';

export const loadAssignedExperiments = createAction(
  '[AssignedExperiment] Load AssignedExperiments'
);

export const AssignedExperimentPageLoaded = createAction(
  '[AssignedExperimentPageComponent] AssignedExperiment page Loaded',
  props<{
    AssignedExperiment: AssignedExperimentGetResponse;
    currentPage: number;
  }>()
);

export const loadAssignedExperimentNext = createAction(
  '[AssignedExperimentPageComponent] load AssignedExperiment next',
  props<{
    pagination: number;
  }>()
);
export const AssignedExperimentNextLoaded = createAction(
  '[effect] AssignedExperiment  next  Loaded',
  props<{
    AssignedExperiment: AssignedExperimentGetResponse;
    currentPage: number;
  }>()
);
export const AssignedExperimentPageFail = createAction(
  '[effect] AssignedExperiment page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
