import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  Experiment,
  ExperimentPayload,
  ShowExperimentGetResponse,
} from '../../../models/show-experiment';

export const loadShExperiments = createAction(
  '[ShExperimentsComponent] load ShExperiments'
);
export const ShExperimentsLoaded = createAction(
  '[ShExperimentsComponent] ShExperiments  Loaded',
  props<{ ShExperiments: ShowExperimentGetResponse; currentPage: number }>()
);

export const loadShExperimentsNext = createAction(
  '[ShExperimentsComponent] load ShExperiments next',
  props<{
    pagination: number;
  }>()
);
export const ShExperimentsNextLoaded = createAction(
  '[effect] ShExperiments  next  Loaded',
  props<{
    ShExperiments: ShowExperimentGetResponse;
    currentPage: number;
  }>()
);
export const ShExperimentsFail = createAction(
  '[effect] ShExperiments   fail',
  props<{ error: HttpErrorResponse; errorMessage: string }>()
);
export const sumbitShExperiments = createAction(
  '[ShExperimentsComponent] ShExperiments  submit action',
  props<{ payload: ExperimentPayload }>()
);
export const ShExperimentsSubmited = createAction(
  '[ShExperimentsEffect] ShExperiments  submit data success ',
  props<{ data: Experiment }>()
);
export const editShExperiments = createAction(
  '[ShExperimentsComponent] ShExperiments  edit action',
  props<{ payload: ExperimentPayload; id: string }>()
);
export const ShExperimentsEdited = createAction(
  '[ShExperimentsEffect] ShExperiments  edit data success ',
  props<{ Experiment: Experiment; ExperimentId: string | any }>()
);
export const deleteYourExperiment = createAction(
  '[effect] delete your Experiment ',
  props<{ ExperimentId: any }>()
);
export const yourExperimentDeleted = createAction(
  '[effect]  your Experiment deleted ',
  props<{ ExperimentId: any }>()
);
