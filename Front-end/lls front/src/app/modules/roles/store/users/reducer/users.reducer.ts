import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { UserOnePage } from '../../../models/users';
import { UsersPageActions } from '../action/users-type';

export const initState: UserOnePage = {
  currentPage: 1,
};
export const UsersPageReducer = createReducer(
  initState,
  on(UsersPageActions.UsersPageLoaded, (state, action) =>
    action.Users
      ? {
          ...state,
          [action.currentPage]: action.Users,
          currentPage: action.currentPage,
        }
      : state
  ),

  on(UsersPageActions.UsersNextLoaded, (state, action) => {
    if (action.Users) {
      return {
        ...state,
        [action.currentPage]: action.Users,
        currentPage: action.currentPage,
      };
    } else {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
  }),
  on(UsersPageActions.UsersEdited, (state, action) => {
    const newDict = cloneDeep(state);
    const index = newDict?.[state.currentPage]?.data?.result?.findIndex(
      (val) => {
        return val.idd === action.User.idd;
      }
    )!;
    newDict?.[state?.currentPage]?.data?.result.splice(index, 1, action.User)!;
    return action
      ? {
          ...state,
          ...newDict,
        }
      : state;
  }),
  on(UsersPageActions.yourUserDeleted, (state, action) => {
    const newDict = cloneDeep(state);
    newDict[state.currentPage].data.result = newDict?.[
      state?.currentPage
    ]?.data?.result?.filter((val) => {
      return val.idd !== action.UserId;
    });
    return {
      ...state,
      ...newDict,
    };
  }),
  on(UsersPageActions.UsersSubmited, (state, action) => {
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
