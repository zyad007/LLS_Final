import { createReducer, on } from '@ngrx/store';
import { LabOnePage } from '../../../models/lab';
import { LabsPageActions } from '../action/lab-type';

export const initState: LabOnePage = {
  currentPage: 1,
};
export const LabsPageReducer = createReducer(
  initState,
  on(LabsPageActions.LabsPageLoaded, (state, action) =>
    action.Labs
      ? {
          ...state,
          [action.currentPage]: action.Labs,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(LabsPageActions.LabsNextLoaded, (state, action) => {
    if (action.Labs) {
      return {
        ...state,
        [action.currentPage]: action.Labs,
        currentPage: action.currentPage,
      };
    } else {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
  })
);
