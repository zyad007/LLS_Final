import { createReducer, on } from '@ngrx/store';
import { CompletedExperimentOnePage } from '../../models/completed-experiment';
import { CompletedExperimentActions } from '../action/completed-experiment-type';

export const initState: CompletedExperimentOnePage = {
  currentPage: 1,
};
export const CompletedExperimentReducer = createReducer(
  initState,
  on(
    CompletedExperimentActions.CompletedExperimentPageLoaded,
    (state, action) =>
      action.CompletedExperiment
        ? {
            ...state,
            [action.currentPage]: action.CompletedExperiment,
            currentPage: action.currentPage,
          }
        : state
  ),

  on(
    CompletedExperimentActions.CompletedExperimentNextLoaded,
    (state, action) => {
      if (action.CompletedExperiment) {
        return {
          ...state,
          [action.currentPage]: action.CompletedExperiment,
          currentPage: action.currentPage,
        };
      } else {
        return {
          ...state,
          currentPage: action.currentPage,
        };
      }
    }
  )
);
