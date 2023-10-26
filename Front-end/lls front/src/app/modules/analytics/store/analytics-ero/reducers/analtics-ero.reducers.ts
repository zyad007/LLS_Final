import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  AnalyticDetailsGetResponse,
  AnalyticDetailsResponse,
} from '../../../models/analytics-ero';
import { AnalyticDetailsActions } from '../action/analtics-ero-type';

export interface AnalyticDetailsState {
  AnalyticDetails: AnalyticDetailsResponse;
}
export const initState: AnalyticDetailsState = {
  AnalyticDetails: {},
};

export const AnalyticDetailsReducer = createReducer(
  initState,
  on(AnalyticDetailsActions.AnalyticDetailLoaded, (state, action) => {
    const newDictionrey: { [key: string]: AnalyticDetailsGetResponse } =
      cloneDeep(state.AnalyticDetails);
    newDictionrey[action.id] = { ...action.AnalyticDetails, loaded: true };
    return action.AnalyticDetails
      ? {
          ...state,
          AnalyticDetails: newDictionrey,
        }
      : { ...state };
  })
);
