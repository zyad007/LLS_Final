import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  ExperimentDetailsGetResponse,
  ExperimentDetailsResponse,
} from '../../../models/experiment-details';
import { ExperimentDetailsActions } from '../action/experiment-details-type';

export interface ExperimentDetailsState {
  ExperimentDetails: ExperimentDetailsResponse;
}
export const initState: ExperimentDetailsState = {
  ExperimentDetails: {},
};

export const ExperimentDetailsReducer = createReducer(
  initState,
  on(ExperimentDetailsActions.ExperimentDetailLoaded, (state, action) => {
    const newDictionrey: { [key: string]: ExperimentDetailsGetResponse } =
      cloneDeep(state.ExperimentDetails);
    newDictionrey[action.id] = { ...action.ExperimentDetails, loaded: true };
    return action.ExperimentDetails
      ? {
          ...state,
          ExperimentDetails: newDictionrey,
        }
      : { ...state };
  })
);
