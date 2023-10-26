import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { LabsGetResponse } from '../../../models/lab';

export const loadLabsPage = createAction('[LabsPageComponent] load Labs page ');
export const LabsPageLoaded = createAction(
  '[LabsPageComponent] Labs page Loaded',
  props<{ Labs: LabsGetResponse; currentPage: number }>()
);

export const loadLabsNext = createAction(
  '[LabsPageComponent] load Labs next',
  props<{
    pagination: number;
  }>()
);
export const LabsNextLoaded = createAction(
  '[effect] Labs  next  Loaded',
  props<{
    Labs: LabsGetResponse;
    currentPage: number;
  }>()
);
export const LabsPageFail = createAction(
  '[effect] Labs page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
