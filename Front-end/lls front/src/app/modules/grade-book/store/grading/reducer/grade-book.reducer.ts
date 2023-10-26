import { createReducer, on } from '@ngrx/store';
import { GradingOnePage } from '../../../models/grade-book';
import { GradingActions } from '../action/grade-book-type';

export const initState: GradingOnePage = {};
export const GradingReducer = createReducer(
  initState,
  on(GradingActions.GradingPageLoaded, (state, action) => {
    return action
      ? {
          ...state,
          ...action.Grading,
        }
      : state;
  }),

  on(GradingActions.GradingNextLoaded, (state, action) => {
    if (action.Grading) {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.currntPage]: action.Grading,
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
  })
);
