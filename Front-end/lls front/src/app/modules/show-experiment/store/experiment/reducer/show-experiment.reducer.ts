import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { ExperimentOnePage } from '../../../models/show-experiment';
import { ExperimentsActions } from '../action/show-experiment-type';

export const initState: ExperimentOnePage = {
  currentPage: 1,
};
export const ShExperimentsReducer = createReducer(
  initState,
  on(ExperimentsActions.ShExperimentsLoaded, (state, action) =>
    action.ShExperiments
      ? {
          ...state,
          [action.currentPage]: action.ShExperiments,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(ExperimentsActions.ShExperimentsNextLoaded, (state, action) => {
    if (action.ShExperiments) {
      return {
        ...state,
        [action.currentPage]: action.ShExperiments,
        currentPage: action.currentPage,
      };
    } else {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
  }),
  on(ExperimentsActions.ShExperimentsEdited, (state, action) => {
    const newDict = cloneDeep(state);
    const index = newDict?.[state.currentPage]?.data?.result?.findIndex(
      (val) => {
        return val.idd === action.Experiment.idd;
      }
    )!;
    let data = newDict?.[state?.currentPage]?.data?.result.splice(
      index,
      1,
      action.Experiment
    )!;
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  }),
  on(ExperimentsActions.yourExperimentDeleted, (state, action) => {
    const newDict = cloneDeep(state);
    newDict[state.currentPage].data.result = newDict?.[
      state?.currentPage
    ]?.data?.result?.filter((val) => {
      return val.idd !== action.ExperimentId;
    });
    return {
      ...state,
      ...newDict,
    };
  }),
  on(ExperimentsActions.ShExperimentsSubmited, (state, action) => {
    const newDict = cloneDeep(state);
    newDict?.[state?.currentPage]?.data?.result.push(action.data);
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  })
);
