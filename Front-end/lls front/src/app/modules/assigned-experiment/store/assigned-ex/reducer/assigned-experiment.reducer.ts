import { createReducer, on } from '@ngrx/store';
import { AssignedExperimentOnePage } from '../../../models/assigned-experiment';
import { AssignedExperimentActions } from '../action/assigned-experiment-type';

export const initState: AssignedExperimentOnePage = {
  currentPage: 1,
};
export const AssignedExperimentReducer = createReducer(
  initState,
  on(AssignedExperimentActions.AssignedExperimentPageLoaded, (state, action) =>
    action.AssignedExperiment
      ? {
          ...state,
          [action.currentPage]: action.AssignedExperiment,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(
    AssignedExperimentActions.AssignedExperimentNextLoaded,
    (state, action) => {
      if (action.AssignedExperiment) {
        return {
          ...state,
          [action.currentPage]: action.AssignedExperiment,
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
