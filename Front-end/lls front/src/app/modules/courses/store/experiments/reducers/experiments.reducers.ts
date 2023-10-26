import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Experiments } from '../../../models/experiment';
import { ExperimentActions } from '../action/experiments-type';

export const initState: Experiments = {};
export const experimentPageReducer = createReducer(
  initState,
  on(ExperimentActions.ExperimentPageLoaded, (state, action) =>
    action
      ? {
          ...state,
          ...action.experiments,
        }
      : state
  ),
  on(ExperimentActions.ExperimentNextLoaded, (state, action) => {
    if (action.experiments) {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.currntPage]: action.experiments,
          currentPage: action.currntPage,
        },
      };
    } else {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          currentPage: action.currntPage,
        },
      };
    }
  }),
  on(ExperimentActions.Experimentassigned, (state, action) => {
    const newDict = cloneDeep({ ...state });
    newDict?.[action?.courseId]?.[
      state[action.courseId].currentPage
    ]?.data?.result.push(action.Experiments);
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  })
);
