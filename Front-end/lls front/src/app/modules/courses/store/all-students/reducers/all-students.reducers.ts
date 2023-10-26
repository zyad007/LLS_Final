import { createReducer, on } from '@ngrx/store';
import { AllStudents } from '../../../models/all-student';
import { AllStudentsActions } from '../action/all-students-type';

export const initState: AllStudents = {};
export const AllStudentsReducer = createReducer(
  initState,
  on(AllStudentsActions.AllStudentLoaded, (state, action) =>
    action.data
      ? {
          ...state,
          ...action.data,
        }
      : state
  ),
  on(AllStudentsActions.AllStudentNextLoaded, (state, action) => {
    if (action.data) {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.currntPage]: action.data,
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
