import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ExperimentDetailsGetResponse } from '../../../models/experiment-details';

export const loadExperimentDetail = createAction(
  '[ExperimentDetail Component] load Experiment detail ',
  props<{ id: string }>()
);
export const ExperimentDetailLoaded = createAction(
  '[ExperimentDetail Effect] Experiment Detail  Loaded',
  props<{ ExperimentDetails: ExperimentDetailsGetResponse; id: string }>()
);
export const ExperimentDetailFail = createAction(
  '[ExperimentDetail Effect] Experiment Detail  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
