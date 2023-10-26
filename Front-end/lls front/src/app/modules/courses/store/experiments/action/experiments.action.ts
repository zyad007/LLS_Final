import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AssignExperimentPayload } from 'src/app/modules/show-experiment/models/show-experiment';
import {
  Experiment,
  ExperimentGetResponse,
  Experiments,
} from '../../../models/experiment';

export const loadExperimentPage = createAction(
  '[ExperimentPageComponent] load experiment page ',
  props<{ id: string }>()
);
export const ExperimentPageLoaded = createAction(
  '[ExperimentListComponent] experiment page  Loaded',
  props<{ experiments: Experiments }>()
);

export const loadExperimentNext = createAction(
  '[ExperimentListComponent] load experiment  next',
  props<{
    pagination: number;
    id: string | number;
  }>()
);
export const ExperimentNextLoaded = createAction(
  '[ExperimentListComponent] experiment  next  Loaded',
  props<{
    experiments: ExperimentGetResponse;
    id: string | number;
    currntPage: number;
  }>()
);
export const ExperimentpageFail = createAction(
  '[ExperimentListComponent] experiment page  fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
export const assignExperiment = createAction(
  '[ExperimentComponent] Experiment  assigned action',
  props<{ courseId: string; payload: AssignExperimentPayload }>()
);
export const Experimentassigned = createAction(
  '[ExperimentEffect] Experiment  assigned data success ',
  props<{
    courseId: string;
    Experiments: Experiment;
  }>()
);
