import { createReducer, on } from '@ngrx/store';
import { Teachers } from '../../../models/teachers';
import { TeachersStudentss } from '../../../models/teachers-students';
import { TeacherStudentActions } from '../action/teacher-student-type';

export const initState: TeachersStudentss = {};
export const TeacherStudentReducer = createReducer(
  initState,
  on(TeacherStudentActions.AllTeacherStudentLoaded, (state, action) =>
    action.data
      ? {
          ...state,
          ...action.data,
        }
      : state
  ),
  on(TeacherStudentActions.AllTeacherStudentNextLoaded, (state, action) => {
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
